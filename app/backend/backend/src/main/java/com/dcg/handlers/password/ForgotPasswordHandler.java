package com.dcg.handlers.password;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class ForgotPasswordHandler {

    @Value("${jwt.password.change.secret}")
    private String secretKey;

    @Value("${jwt.password.change.expiration}")
    private long expirationTime;

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public String createToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .claim("username", username) // Add custom claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSignInKey())
                .compact();
    }

    /**
     * Verifies the JWT token and returns whether it is valid.
     *
     * @param token The JWT token to be verified.
     * @return true if the token is valid, false otherwise.
     */
    public boolean verifyToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSignInKey())
                    .parseClaimsJws(token);;

            return true;
        } catch (Exception e) {
            // Handle the exception (e.g., logging)
            return false;
        }
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
