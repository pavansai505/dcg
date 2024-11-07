package com.dcg.response;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {
    private String token;
    private String username;
    private String refreshToken;
}
