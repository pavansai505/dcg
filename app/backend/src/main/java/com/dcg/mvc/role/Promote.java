package com.dcg.mvc.role;

import com.dcg.constants.UserRole;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Promote {
    private String username;
    private UserRole role;
}
