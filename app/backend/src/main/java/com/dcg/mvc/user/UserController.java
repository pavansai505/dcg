package com.dcg.mvc.user;

import com.dcg.exception.CustomUserExceptions;
import com.dcg.handlers.password.ForgotPasswordHandler;
import com.dcg.model.*;
import com.dcg.mvc.coupon.Coupon;
import com.dcg.mvc.coupon.CouponService;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseDTO;
import com.dcg.mvc.course.CourseMapper;
import com.dcg.response.CustomResponse;
import com.dcg.response.TokenResponse;
import com.dcg.services.EmailService;
//import jakarta.annotation.Resource;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ForgotPasswordHandler forgotPasswordHandler;
    private final EmailService emailService;
    private final UserMapper userMapper;
    private final CourseMapper courseMapper;
    private final CouponService couponService;
//    private final String imagePath = Paths.get("src", "main", "resources", "static", "profile", "pics").toAbsolutePath().toString();
    private final ResourceLoader resourceLoader;
    /**
     * Register a new user and return an authentication token.
     * @param user The user details for registration.
     * @return The authentication token and username.
     * @throws ServletException If a servlet error occurs.
     * @throws IOException If an I/O error occurs.
     */
    @PostMapping("/auth/register")
    public ResponseEntity<TokenResponse> registerUser(@RequestBody User user) throws ServletException, IOException {
        userService.createAccount(user);
        String token = userService.userLogin(user);
        String username = userService.getUsername(user);
        return ResponseEntity.ok(TokenResponse.builder().token(token).username(username).build());
    }

    /**
     * Authenticate a user and return an authentication token.
     * @param request The user login details.
     * @return The authentication token and username.
     * @throws ServletException If a servlet error occurs.
     * @throws IOException If an I/O error occurs.
     */
    @PostMapping("/auth/login")
    public ResponseEntity<TokenResponse> userLogin(@RequestBody User request) throws ServletException, IOException {
        String token = userService.userLogin(request);
        String username = userService.getUsername(request);
        return ResponseEntity.ok(TokenResponse.builder().token(token).username(username).build());
    }

    /**
     * Retrieve the count of all users.
     * @return The total user count.
     */
    @GetMapping("/getUserCount")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userService.getUserCount());
    }


    @GetMapping()
    public ResponseEntity<List<UserDTO>> getUsers(  ) {
        return ResponseEntity.ok(
                userService.getUsers().stream().map(UserMapper::convertToDTO).collect(Collectors.toList()));
    }

    @GetMapping("/getMyDetails")
    public ResponseEntity<UserDTO> getMyDetails(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(UserMapper.convertToDTO(userService.getMyDetails(user.getUsername())));
    }
    @GetMapping("/getById/{id}")
        public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
            return ResponseEntity.ok(UserMapper.convertToDTO(userService.getUserById(id)));
        }
    /**
     * Get the courses registered by the currently authenticated user.
     * @param authentication The current user's authentication details.
     * @return The list of registered courses.
     */
    @GetMapping("/registered-courses")
    public ResponseEntity<List<CourseDTO>> getRegisteredCourses(Authentication authentication) {
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        List<Course> courses = userService.getRegisteredCourses(username);
        List<CourseDTO> courseDTOs = courses.stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(courseDTOs);
    }

    /**
     * Handle forgot password requests by generating and sending a reset token.
     * @param forgotPasswordRequest The request with email to reset password.
     * @return A response message indicating that the reset email has been sent.
     */
    @PostMapping("/auth/forgot-password")
    public ResponseEntity<CustomResponse> requestPasswordReset(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        if (userService.userExists(forgotPasswordRequest.getEmail())) {
            String token = forgotPasswordHandler.createToken(forgotPasswordRequest.getEmail());
            emailService.sendPasswordChangeEmail(forgotPasswordRequest.getEmail(), token);
            return ResponseEntity.ok(CustomResponse.builder().message("Check your mail for the reset token").build());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    /**
     * Reset the password using the provided token and new password.
     * @param resetPassword The reset password request containing token and new password.
     * @return A response message indicating the password change status.
     */
    @PostMapping("/auth/reset-password")
    public ResponseEntity<CustomResponse> resetPasswordUsingToken(@RequestBody ResetPassword resetPassword) {
        if (forgotPasswordHandler.verifyToken(resetPassword.getToken())) {
            String username = forgotPasswordHandler.getClaimsFromToken(resetPassword.getToken()).getSubject();
            userService.changePassword(username, resetPassword.getPassword());
            return ResponseEntity.ok(CustomResponse.builder().message("Password changed successfully").build());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired token");
        }
    }

    /**
     * Change the password for the currently authenticated user.
     * @param resetPassword The request containing new password.
     * @param authentication The current user's authentication details.
     * @return A response message indicating the password change status.
     */
    @PostMapping("/auth/change-password")
    public ResponseEntity<CustomResponse> changePasswordForCurrentUser(@RequestBody ResetPassword resetPassword, Authentication authentication) {
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        userService.changePassword(username, resetPassword.getPassword());
        return ResponseEntity.ok(CustomResponse.builder().message("Password changed successfully").build());
    }
    @PutMapping("/subscribe-to-email")
    public ResponseEntity<CustomResponse> subscribeToEmail(Authentication authentication) {
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        userService.subscribeToNewsLetter(username);
        return ResponseEntity.ok(CustomResponse.builder().message("Subscription changed successfully").build());
    }

    @PutMapping("/update") // PUT request to update user by ID
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK); // Return the updated user with 200 OK
        } catch (CustomUserExceptions.UserNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND); // Return 404 if user not found
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            String imageUrl = userService.uploadUserImage(
                    ((UserDetails) authentication.getPrincipal()).getUsername(),
                    file);

            // Wrap the imageUrl in a Map for a proper JSON response
            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", imageUrl); // Assuming `imageUrl` is the filename

            return ResponseEntity.ok(response); // Return the JSON response
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error uploading image: " + e.getMessage()));
        }
    }


    /**
     * Endpoint to retrieve user's image URL.
     *

     * @return A response entity containing the user's image URL.
     */
    @GetMapping("/profile/image")
    public ResponseEntity<Map<String, String>> getUserImage(Authentication authentication) {
        // Get the username from the authentication object
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();

        // Fetch the image URL from the user service
        String imageUrl = userService.getUserImageUrl(username);

        // Prepare the response
        Map<String, String> response = new HashMap<>();

        if (imageUrl != null && !imageUrl.isEmpty()) {
            response.put("imageUrl", imageUrl);
            return ResponseEntity.ok(response); // Return the image URL if it exists
        } else {
            response.put("message", "No image found for user.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // Return a 404 if no image is found
        }
    }

//    @GetMapping("/profile/images/{imageName:.+}")
//    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
//        try {
//            Resource resource = resourceLoader.getResource("classpath:static/images/" + imageName);
//            System.out.println(resource);
//            System.out.println(resource.exists());
//            if (resource.exists()) {
//                HttpHeaders headers = new HttpHeaders();
//                String contentType = determineContentType(imageName);
//                headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageName + "\"");
//                headers.add(HttpHeaders.CONTENT_TYPE, contentType); // Set the content type
//
//                // Add cache control headers
//                headers.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate"); // HTTP 1.1.
//                headers.add(HttpHeaders.PRAGMA, "no-cache"); // HTTP 1.0.
//                headers.add(HttpHeaders.EXPIRES, "0"); // Proxies.
//
//                return ResponseEntity.ok()
//                        .headers(headers)
//                        .body(resource);
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
//
//    private String determineContentType(String imageName) {
//        if (imageName.endsWith(".png")) {
//            return "image/png";
//        } else if (imageName.endsWith(".jpg") || imageName.endsWith(".jpeg")) {
//            return "image/jpeg";
//        } else {
//            return "application/octet-stream"; // Default if the type is unknown
//        }
//    }

}
