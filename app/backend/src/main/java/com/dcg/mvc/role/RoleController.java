package com.dcg.mvc.role;

import jakarta.servlet.ServletException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("role")
public class RoleController {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    RoleService roleService;

    @GetMapping
    public String ok(){
        return "fine";
    }
    @PostMapping("/create")
    public ResponseEntity<Role> createRole(@RequestBody Role role){
        return ResponseEntity.ok().body(roleRepository.save(role));
    }
    @PostMapping("/promote/{userId}")
    public ResponseEntity<Void> promoteUser(@PathVariable Long userId, @RequestBody RoleRequest roleRequest) {
        try {
            boolean success = roleService.promoteUserRole(userId, roleRequest.getRole());
            if (success) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Remove a role from a user
    @PostMapping("/demote/{userId}")
    public ResponseEntity<Void> removeRole(@PathVariable Long userId, @RequestBody RoleRequest roleRequest) {
        try {
            boolean success = roleService.removeRole(userId, roleRequest.getRole());
            if (success) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
