package com.dcg.mvc.user.social;

import com.dcg.constants.Roles;
import com.dcg.exception.CustomUserExceptions;
import com.dcg.mvc.role.RoleRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import com.dcg.response.TokenResponse;
import com.dcg.security.JwtTokenCreation;
import com.google.api.client.json.webtoken.JsonWebToken;
import com.google.auth.oauth2.TokenVerifier;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SocialAuth {

    @Value("${google.client.id}")
    private String googleClientId;

    @Value("${google.issuer}")
    private String googleIssuer;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenCreation jwtTokenCreation;

    private static final Logger logger = LoggerFactory.getLogger(SocialAuth.class);

    public TokenResponse registerUser(String idToken) throws TokenVerifier.VerificationException, ServletException, IOException {
        GoogleUser googleUser = getGoogleUserFromToken(idToken);
        createUser(googleUser);
        logger.info("User registered: {}", googleUser.getEmail());
        return userLogin(googleUser);
    }

    public TokenResponse loginUser(String idToken) throws TokenVerifier.VerificationException, ServletException, IOException {
        GoogleUser googleUser = getGoogleUserFromToken(idToken);
        return userLogin(googleUser);
    }

    private GoogleUser getGoogleUserFromToken(String idToken) throws TokenVerifier.VerificationException {
        // Verify the token
        TokenVerifier verifier = TokenVerifier.newBuilder()
                .setAudience(googleClientId)
                .setIssuer(googleIssuer)
                .build();

        JsonWebToken.Payload payload = verifier.verify(idToken).getPayload();

        // Extract user details from payload with null-safe handling
        GoogleUser googleUser = new GoogleUser();

        // Use the default empty string approach for null checks
        googleUser.setEmail((String) (payload.get("email") == null ? "" : payload.get("email")));
        googleUser.setFirstName((String) (payload.get("given_name") == null ? "" : payload.get("given_name")));
        googleUser.setLastName((String) (payload.get("family_name") == null ? "" : payload.get("family_name")));
        googleUser.setPictureUrl((String) (payload.get("picture") == null ? "" : payload.get("picture")));
        googleUser.setFullName((String) (payload.get("name") == null ? "" : payload.get("name")));

        // Log user info for debugging
        logger.debug("Google User Info: {}", googleUser);

        return googleUser;
    }


    public void createUser(GoogleUser user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new CustomUserExceptions.UserAlreadyExistsException("User already exists with email: " + user.getEmail());
        }

        User newUser = User.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .roles(List.of(roleRepository.findByName(Roles.ROLE_USER)
                        .orElseThrow(() -> new CustomUserExceptions.RoleNotFoundException("Role not found"))))
                .build();

        userRepository.save(newUser);
        logger.info("Created new user: {}", user.getEmail());
    }

    public TokenResponse userLogin(GoogleUser user) throws ServletException, IOException {
        User authenticatedUser = userRepository.findByEmail(user.getEmail())
                .filter(u -> !u.isDisabled())
                .orElseThrow(() -> new CustomUserExceptions.AuthenticationFailedException("User not found or disabled: " + user.getEmail()));

        String jwtToken = jwtTokenCreation.createToken(authenticatedUser);
        String refreshToken = jwtTokenCreation.createRefreshToken(authenticatedUser);

        logger.info("JWT and refresh token created for user: {}", authenticatedUser.getEmail());

        return TokenResponse.builder()
                .username(user.getFullName())
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }
}
