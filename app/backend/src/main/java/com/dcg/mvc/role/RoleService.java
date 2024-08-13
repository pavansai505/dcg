package com.dcg.mvc.role;

import com.dcg.constants.UserRole;
import com.dcg.model.Promote;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
