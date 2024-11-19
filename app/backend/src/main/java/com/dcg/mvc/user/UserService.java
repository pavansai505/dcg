package com.dcg.mvc.user;

import com.dcg.constants.Roles;
import com.dcg.mvc.coupon.CouponService;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.role.RoleRepository;
import com.dcg.mvc.user.exceptions.NameModificationTooSoonException;
import com.dcg.mvc.user.exceptions.UserDisabledException;
import com.dcg.response.TokenResponse;
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
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
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

    @Value(("${app.base.url}"))
    private String baseUrl;


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
    public TokenResponse userLogin(User user) throws ServletException, IOException {
        try {
            // Find the user by email first
            Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
            if (optionalUser.isEmpty() || optionalUser.get().isDisabled()) { // Assume you have a method to check if user is disabled
                throw new UserDisabledException("User account is disabled for email: " + user.getEmail());
            }

            // Authenticate the user
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    ));

            logger.debug("Authentication details: {}", auth);
            return TokenResponse.builder().username(user.getFullName())
                    .token(jwtTokenCreation.createToken((User) auth.getPrincipal()))
                    .refreshToken(jwtTokenCreation.createRefreshToken((User) auth.getPrincipal()))
                    .imageUrl(optionalUser.get().getImageUrl()).build();
        } catch (UserDisabledException e) {
            throw e; // Re-throwing the custom exception to be handled by the handler
        } catch (BadCredentialsException e) {
            throw new AuthenticationFailedException("Invalid credentials for email: " + user.getEmail());
        } catch (Exception e) {
            throw new AuthenticationFailedException("Authentication failed for email: " + user.getEmail());
        }
    }
    public TokenResponse generateTokens(String username) throws ServletException, IOException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));


        return TokenResponse.builder().username(user.getFullName())
                .token(jwtTokenCreation.createToken(user))
                .refreshToken(jwtTokenCreation.createRefreshToken(user))
                .imageUrl(user.getImageUrl()).build();

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

    public User updateUser(UpdateUserName user, String username) {
        // Check if the user with the given email exists
        Optional<User> optionalUser = userRepository.findByEmail(username);

        if (optionalUser.isEmpty()) {
            // Throw an exception if the user is not found
            throw new UserNotFoundException("User not found.");
        }

        User existingUser = optionalUser.get();
        LocalDateTime currentTime = LocalDateTime.now();

        // Check if nameLastModifiedDate is less than 30 days old
        if (existingUser.getNameLastModifiedDate().plusDays(30).isAfter(currentTime)) {
            throw new NameModificationTooSoonException("Cannot update name. Last modification was less than 30 days ago.");
        }

        // Update the user details
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setNameLastModifiedDate(currentTime); // Update the modification time

        // Save the updated user
        return userRepository.save(existingUser);
    }

    public String uploadUserImage(String username, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));

        // Get the old image URL
        String oldImageUrl = user.getImageUrl();

        // Generate a unique filename for the new image
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Define the upload directory inside the resources folder
        String resourcePath = Paths.get("src", "main", "resources", "static", "images","user",user.getId()+"").toAbsolutePath().toString();
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
        System.out.println(baseUrl+splitImageUrl(filePath.toString())+"----"+filePath+"----"+fileName);
        // Update the user with the new image URL
        user.setImageUrl(baseUrl+splitImageUrl(filePath.toString())); // Save only the file name
        userRepository.save(user);

        return user.getImageUrl(); // Returning the filename
    }
    public String splitImageUrl(String path) {
        // Split the path at "static" and take the second part
        String[] parts = path.split("static");
        if (parts.length > 1) {
            // Replace any backslashes with forward slashes in the remaining path for consistency
            return parts[1].replace("\\", "/");
        } else {
            System.out.println("The specified path does not contain 'static'.");
            return null;  // Return null if 'static' is not found
        }
    }


    public String getUserImageUrl(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + username));

        return user.getImageUrl(); // Assuming getImageUrl() method exists in User class
    }
    @Secured("ROLE_ADMIN")
    public User toggleUser(Long id){
        User user=userRepository.findById(id).orElseThrow(()->new UserNotFoundException("Contest not found"));
        user.setDisabled(!user.isDisabled());
        return userRepository.save(user);
    }

}
