package com.dcg.mvc.user.social;

import lombok.Data;

@Data
public class GoogleUser {
    private String email;
    private String firstName;
    private String pictureUrl;
    private String lastName;
    private String fullName;

}
