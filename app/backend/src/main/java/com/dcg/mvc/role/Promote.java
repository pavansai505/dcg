package com.dcg.model;

import com.dcg.constants.Roles;
import com.dcg.constants.UserRole;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Promote {
    private String username;
    private UserRole role;
}
