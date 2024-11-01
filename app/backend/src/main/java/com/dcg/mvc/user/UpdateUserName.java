package com.dcg.mvc.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserName {
    private String firstName;
    private String lastName;
}
