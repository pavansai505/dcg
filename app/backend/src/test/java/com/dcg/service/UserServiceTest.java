package com.dcg.service;

import com.dcg.constants.Roles;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.role.Role;
import com.dcg.mvc.role.RoleRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import com.dcg.mvc.user.UserService;
import com.dcg.security.JwtTokenCreation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenCreation jwtTokenCreation;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void userLogin_ShouldAuthenticateAndReturnToken() throws Exception {
        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword("password");

        // Create a mock Authentication object
        Authentication auth = mock(Authentication.class);
        when(auth.getPrincipal()).thenReturn(user);

        // Configure the AuthenticationManager mock
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(auth);

        // Mock JwtTokenCreation to return a token
        when(jwtTokenCreation.createToken(any(User.class))).thenReturn("token");

        // Call the method under test
        String token = userService.userLogin(user);

        // Verify that the token is correct
        assertNotNull(token);
        assertEquals("token", token);

        // Verify interactions
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtTokenCreation, times(1)).createToken(user);
    }





    @Test
    void getMyDetails_ShouldReturnUserDetails() {
        User user = new User();
        user.setEmail("user@example.com");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        User result = userService.getMyDetails("user@example.com");

        assertNotNull(result);
        assertEquals("user@example.com", result.getEmail());
        verify(userRepository, times(1)).findByEmail(anyString());
    }

    @Test
    void getUsername_ShouldReturnFullName() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("user@example.com");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        String fullName = userService.getUsername(user);

        assertEquals("John Doe", fullName);
        verify(userRepository, times(1)).findByEmail(anyString());
    }

    @Test
    void getUserCount_ShouldReturnCount() {
        when(userRepository.getUserCount()).thenReturn(10L);

        Long count = userService.getUserCount();

        assertEquals(10L, count);
        verify(userRepository, times(1)).getUserCount();
    }

    @Test
    void getRegisteredCourses_ShouldReturnCourses() {
        User user = new User();
        user.setEmail("user@example.com");
        List<Course> courses = List.of(new Course());
        user.setCourses(courses);

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        List<Course> registeredCourses = userService.getRegisteredCourses("user@example.com");

        assertNotNull(registeredCourses);
        assertEquals(1, registeredCourses.size());
        verify(userRepository, times(1)).findByEmail(anyString());
    }

    @Test
    void userExists_ShouldReturnTrueIfUserExists() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new User()));

        Boolean exists = userService.userExists("user@example.com");

        assertTrue(exists);
        verify(userRepository, times(1)).findByEmail(anyString());
    }

    @Test
    void changePassword_ShouldUpdatePassword() {
        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword("oldPassword");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(anyString())).thenReturn("newEncodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User updatedUser = userService.changePassword("user@example.com", "newPassword");

        assertNotNull(updatedUser);
        assertEquals("newEncodedPassword", updatedUser.getPassword());
        verify(userRepository, times(1)).findByEmail(anyString());
        verify(passwordEncoder, times(1)).encode(anyString());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
