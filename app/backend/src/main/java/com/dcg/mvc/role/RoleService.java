package com.dcg.mvc.role;

import com.dcg.constants.Roles;
import com.dcg.constants.UserRole;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    public Promote promoteUser(Promote promote){
        User user=userRepository.findByEmail(promote.getUsername()).orElse(null);
        if(user!=null){
            Role role=roleRepository.findByName(promote.getRole().toString()).orElse(null);
            if(role!=null){
                user.getRoles().add(role);
                userRepository.save(user);
                return promote;
            }
        }
        return Promote.builder().role(UserRole.valueOf("ROLE_INVALID")).build();

    }
    // Method to promote a user by adding a role
    public boolean promoteUserRole(Long userId, String roleName) {
        boolean isAdmin=(SecurityContextHolder.getContext().getAuthentication().getAuthorities()).contains(new SimpleGrantedAuthority(Roles.ROLE_ADMIN));
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent() && isAdmin) {
            User user = optionalUser.get();
            Optional<Role> optionalRole = roleRepository.findByName(roleName);
            if (optionalRole.isPresent()) {
                Role role = optionalRole.get();
                if (!user.getRoles().contains(role)) {
                    user.getRoles().add(role);
                    userRepository.save(user);
                    return true; // Successfully promoted
                }
            }
        }
        return false; // Promotion failed
    }

    // Method to remove a role from a user
    public boolean removeRole(Long userId, String roleName) {
        boolean isAdmin=(SecurityContextHolder.getContext().getAuthentication().getAuthorities()).contains(new SimpleGrantedAuthority(Roles.ROLE_ADMIN));
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent() && isAdmin) {
            User user = optionalUser.get();
            Optional<Role> optionalRole = roleRepository.findByName(roleName);
            if (optionalRole.isPresent()) {
                Role role = optionalRole.get();
                if (user.getRoles().contains(role)) {
                    user.getRoles().remove(role);
                    userRepository.save(user);
                    return true; // Successfully removed role
                }
            }
        }
        return false; // Removal failed
    }
}
