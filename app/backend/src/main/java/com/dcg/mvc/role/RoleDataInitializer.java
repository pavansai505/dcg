package com.dcg.mvc.role;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleDataInitializer {

    @Bean
    public CommandLineRunner dataInitializer(RoleRepository roleRepository) {
        return args -> {
            // Check if roles already exist to avoid duplicates
            if (roleRepository.findByName("ROLE_USER").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_USER", null, null, null));
            }
            if (roleRepository.findByName("ROLE_INSTRUCTOR").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_INSTRUCTOR", null, null, null));
            }
            if (roleRepository.findByName("ROLE_MENTOR").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_MENTOR", null, null, null));
            }
            if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_ADMIN", null, null, null));
            }
        };
    }
}
