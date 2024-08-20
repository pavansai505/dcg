package com.dcg.mvc.user;

import com.dcg.handlers.password.ForgotPasswordHandler;
import com.dcg.mapper.UserMapper;
import com.dcg.model.*;
import com.dcg.mvc.course.Course;
import com.dcg.response.TokenResponse;
import com.dcg.services.EmailService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.ServletException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserDTO userDTO;
    private final ForgotPasswordHandler forgotPasswordHandler;
    private final EmailService emailService;
    private final UserMapper userMapper;


    @PostMapping("/auth/register")
    public ResponseEntity<TokenResponse> registerUser(@RequestBody User user) throws ServletException, IOException {
        String token=userService.createAccount(user);
        String username=userService.getUsername(user);
        return ResponseEntity.ok().body(TokenResponse.builder().token(token).username(username).build());
    }
    @PostMapping("/auth/login")
    public ResponseEntity<TokenResponse> userLogin(@RequestBody User request) throws ServletException, IOException {
    String token=userService.userLogin(request);
    String username=userService.getUsername(request);
    return ResponseEntity.ok().body(TokenResponse.builder().token(token).username(username).build());
    }

    @GetMapping("/getUserCount")
    public ResponseEntity<Long> getCourseCount(){
        return ResponseEntity.ok().body(userService.getUserCount());
    }
    @GetMapping("/getMyDetails")
    @Transactional
    public ResponseEntity<UserDTO> getMyDetails(Authentication authentication){

        return ResponseEntity.ok().body(userMapper.convertToDTO(userService.getMyDetails(((User) authentication.getPrincipal()).getUsername())));
    }

    @GetMapping("/registered-courses")
    public ResponseEntity<List<Course>> getRegisteredCourses(Authentication authentication){
        List<Course> courses=userService.getRegisteredCourses(((UserDetails) authentication.getPrincipal()).getUsername());
        return ResponseEntity.ok().body(courses);
    }

    @PostMapping("/auth/forgot-password")
    public ResponseEntity<CustomResponse> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest){
        if(userService.userExists(forgotPasswordRequest.getEmail())){
            String result=forgotPasswordHandler.createToken(forgotPasswordRequest.getEmail());
            emailService.sendPasswordChangeEmail(forgotPasswordRequest.getEmail(), result);
            return ResponseEntity.ok().body(CustomResponse.builder().message("Check your mail "+result).build());
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }


    @PostMapping("/auth/reset-password")
    public ResponseEntity<CustomResponse> resetPassword(@RequestBody ResetPassword resetPassword){

        if(forgotPasswordHandler.verifyToken(resetPassword.getToken())){
            String username=forgotPasswordHandler.getClaimsFromToken(resetPassword.getToken()).getSubject();
            System.out.println(userService.changePassword(username,resetPassword.getPassword()));
            return ResponseEntity.ok().body(CustomResponse.builder().message("Password changed").build());
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        }
    }
    @PostMapping("/auth/change-password")
    public ResponseEntity<CustomResponse> changePassword(@RequestBody ResetPassword resetPassword,Authentication authentication){
        userService.changePassword(((UserDetails) authentication).getUsername(),resetPassword.getPassword());
        return ResponseEntity.ok().body(CustomResponse.builder().message("Password changed").build());
    }



}
