package com.dcg.mvc.role;

import jakarta.servlet.ServletException;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/create")
    public ResponseEntity<Role> createRole(@RequestBody Role role){
        return ResponseEntity.ok().body(roleRepository.save(role));
    }
    @PostMapping("/promote")
    public ResponseEntity<Promote> promoteUser(@RequestBody Promote promote) throws ServletException, IOException {;
        return ResponseEntity.ok().body(roleService.promoteUser(promote));
    }
}
