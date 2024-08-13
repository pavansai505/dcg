package com.dcg.mvc.user;

import com.dcg.constants.Roles;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.role.RoleRepository;
import com.dcg.security.JwtTokenCreation;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenCreation jwtTokenCreation;

    public String createAccount(User user) throws ServletException, IOException {
            User user1=User.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .password(user.getPassword()).build();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(List.of(roleRepository.findByName(Roles.ROLE_USER).get()));
            userRepository.save(user);
            return userLogin(user1);

    }
    public String userLogin(User user) throws ServletException, IOException {
        Authentication auth=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                ));
        System.out.println(auth);
        return jwtTokenCreation.createToken((User) auth.getPrincipal());

    }

    public String getUsername(User user){
        return userRepository.findByEmail(user.getEmail()).get().getFullName();
    }

    public int getUserCount(){
        return userRepository.getUserCount();
    }


    public List<Course> getRegisteredCourses(String username) {
        return userRepository.findByEmail(username).get().getCourses();
    }

    public Boolean userExists(String email){
        return userRepository.findByEmail(email).isPresent();

    }

    public User changePassword(String username,String password) {
        User user=userRepository.findByEmail(username).get();
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);

    }
}
