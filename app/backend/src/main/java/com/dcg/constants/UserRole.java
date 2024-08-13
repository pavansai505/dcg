package com.dcg.constants;

public enum UserRole {

    ROLE_USER("ROLE_USER"),
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_SUPERADMIN("ROLE_SUPERADMIN"),
    ROLE_SPOC("ROLE_SPOC"),
    ROLE_MENTOR("ROLE_MENTOR"),
    ROLE_INSTRUCTOR("ROLE_INSTRUCTOR"),
    ROLE_INVALID("ROLE_INVALID");

    private final String roleName;

    UserRole(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}
