package com.dcg.mvc.user;

import com.dcg.constants.Roles;
import com.dcg.mvc.coupon.Coupon;
import com.dcg.mvc.coupon.CouponService;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.role.RoleRepository;
import com.dcg.security.JwtTokenCreation;
import com.dcg.exception.CustomUserExceptions.UserNotFoundException;
import com.dcg.exception.CustomUserExceptions.UserAlreadyExistsException;
import com.dcg.exception.CustomUserExceptions.RoleNotFoundException;
import com.dcg.exception.CustomUserExceptions.AuthenticationFailedException;
import com.dcg.services.EmailService;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenCreation jwtTokenCreation;
    private final EmailService emailService;
    private final CouponService couponService;

    /**
     * Creates a new user account, saves it, and returns an authentication token.
     * @param user The user details for registration.
     * @throws ServletException If a servlet error occurs.
     * @throws IOException If an I/O error occurs.
     */
    public void createAccount(User user) throws ServletException, IOException {
        // Check if user already exists
        if (userExists(user.getEmail())) {
            throw new UserAlreadyExistsException("User already exists with email: " + user.getEmail());
        }

        // Encrypt the password and set the user's roles
        userRepository.save(
                User.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .password(passwordEncoder.encode(user.getPassword()))
                        .roles(List.of(roleRepository.findByName(Roles.ROLE_USER)
                                .orElseThrow(() -> new RoleNotFoundException("Role not found"))))
                        .build()
        );
    }

    /**
     * Authenticates a user and returns an authentication token.
     * @param user The user details for login.
     * @return The authentication token.
     * @throws ServletException If a servlet error occurs.
     * @throws IOException If an I/O error occurs.
     */
    public String userLogin(User user) throws ServletException, IOException {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    ));

            logger.debug("Authentication details: {}", auth);
            return jwtTokenCreation.createToken((User) auth.getPrincipal());
        } catch (Exception e) {
            throw new AuthenticationFailedException("Authentication failed for email: " + user.getEmail());
        }
    }

    /**
     * Retrieves user details by username.
     * @param username The username of the user.
     * @return The user details.
     */

    public User getMyDetails(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
    }
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }
    /**
     * Retrieves the full name of the user.
     * @param user The user for which to get the full name.
     * @return The full name of the user.
     */
    public String getUsername(User user) {
        return userRepository.findByEmail(user.getEmail())
                .map(User::getFullName)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + user.getEmail()));
    }

    /**
     * Retrieves the count of all users.
     * @return The total user count.
     */
    public Long getUserCount() {
        return userRepository.getUserCount();
    }

    /**
     * Retrieves the courses registered by a user.
     * @param username The username of the user.
     * @return The list of registered courses.
     */
    public List<Course> getRegisteredCourses(String username) {
        return userRepository.findByEmail(username)
                .map(User::getCourses)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
    }

    /**
     * Checks if a user exists by email.
     * @param email The email of the user.
     * @return True if the user exists, otherwise false.
     */
    public Boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    /**
     * Changes the password for a user.
     * @param username The username of the user.
     * @param password The new password.
     * @return The updated user.
     */
    public User changePassword(String username, String password) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public void subscribeToNewsLetter(String username){
        User user=userRepository.findByEmail(username).get();
        user.setSubscribeToEmail(!user.isSubscribeToEmail());
        if(user.isSubscribeToEmail()){
            Coupon coupon=couponService.findCouponByCode("SAVE20").get();
            emailService.sendNewsletterSubscriptionEmail(user.getFullName(),username);
            emailService.sendCouponEmail(username,coupon.getCode(),coupon.getPercentage());
        }
        userRepository.save(user);

    }
}
