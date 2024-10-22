package com.dcg.mvc.user;

import com.dcg.constants.Roles;
import com.dcg.exception.ResourceNotFoundException;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

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


//    @Value("${upload.dir}")
//    private String uploadDir; // Directory where images will be stored
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
    public List<User> getUsers() {
        return userRepository.findAll();
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

    public void subscribeToNewsLetter(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));

        user.setSubscribeToEmail(!user.isSubscribeToEmail());

        if (user.isSubscribeToEmail()) {
            // Send the normal subscription email
            emailService.sendNewsletterSubscriptionEmail(user.getFullName(), username);

            // If the coupon is present, send the coupon email
            couponService.findCouponByCode("SAVE20").ifPresent(coupon ->
                    {
                        if(!coupon.getUsers().contains(user)){
                            emailService.sendCouponEmail(username, coupon.getCode(), coupon.getPercentage());
                        }

                    }
            );
        }

        userRepository.save(user);
    }


    public User updateUser(User user) {
        try {
            // Check if the user with the given ID exists
            Optional<User> optionalUser = userRepository.findById(user.getId());

            if (optionalUser.isPresent()) {
                User existingUser = optionalUser.get();

                // Update the user details
                existingUser.setFirstName(user.getFirstName());
                existingUser.setEmail(user.getEmail());
                existingUser.setLastName(user.getLastName());

                // Save the updated user
                return userRepository.save(existingUser);
            } else {
                // Throw an exception if the user is not found
                throw new RuntimeException("User not found with id: " + user.getId());
            }
        } catch (DataIntegrityViolationException e) {
            // Handle scenario where there might be database constraints violations
            throw new RuntimeException("Invalid data provided for the user update: " + e.getMessage());
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            throw new RuntimeException("An unexpected error occurred while updating the user with id: " + user.getId());
        }
    }


    public String uploadUserImage(String username, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));

        // Get the old image URL
        String oldImageUrl = user.getImageUrl();

        // Generate a unique filename for the new image
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Define the upload directory inside the resources folder
        String resourcePath = Paths.get("src", "main", "resources", "static", "images").toAbsolutePath().toString();
        Path uploadDir = Paths.get(resourcePath);

        // Create the directory if it doesn't exist
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        // If there's an existing image, delete it
        if (oldImageUrl != null && !oldImageUrl.isEmpty()) {
            Path oldImagePath = uploadDir.resolve(oldImageUrl);
            try {
                Files.deleteIfExists(oldImagePath); // Delete the old image file if it exists
            } catch (IOException e) {
                throw new IOException("Failed to delete the old image file", e);
            }
        }

        // Save the file to the specified directory
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Update the user with the new image URL
        user.setImageUrl(fileName); // Save only the file name
        userRepository.save(user);

        return fileName; // Returning the filename
    }

    public String getUserImageUrl(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + username));

        return user.getImageUrl(); // Assuming getImageUrl() method exists in User class
    }

}
