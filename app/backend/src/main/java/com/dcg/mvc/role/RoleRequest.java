package com.dcg.mvc.role;

import lombok.Data;

@Data
public class RoleRequest {
    private String role; // Role to be promoted or removed (e.g., "ROLE_INSTRUCTOR", "ROLE_ADMIN")
}
