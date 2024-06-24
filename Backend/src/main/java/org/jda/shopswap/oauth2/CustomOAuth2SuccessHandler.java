package org.jda.shopswap.oauth2;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jda.shopswap.Jwt.JwtService;
import org.jda.shopswap.models.user.Role;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private static final Logger log = LoggerFactory.getLogger(CustomOAuth2SuccessHandler.class);
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, IOException {
        log.info("OAuth2 authentication success");
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                log.info("Cookie name: " + cookie.getName() + " value: " + cookie.getValue());

            }
        }

        String jwt = "";

        if (!(authentication.getPrincipal() instanceof OidcUser oidcUser)) {
            log.error("OAuth2 authentication failed");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        String userEmail = oidcUser.getEmail();
        //TODO SET THE ADRESS OF GOOGLE AND IMPLEMENTS GOOGLE PAY HERE
        if (userRepository.findByEmail(userEmail).isEmpty()) {
            User newUser = User.builder()
                    .username(oidcUser.getFullName())
                    .email(userEmail)
                    .role(Role.USER)
                    .status(true)
                    .address("No address")
                    .password(UUID.randomUUID().toString())
                    .provider("google")
                    .picture(oidcUser.getPicture())
                    .build();
            userRepository.save(newUser);
            jwt = jwtService.getToken(newUser);
        }else{
            User user = userRepository.findByEmail(userEmail).orElseThrow();
            user.setEmail(userEmail);
            user.setUsername(oidcUser.getFullName());
            user.setProvider("google");
            user.setPicture(oidcUser.getPicture());
            userRepository.save(user);
            jwt = jwtService.getToken(user);
        }
        Cookie jwtCookie = new Cookie("accessToken", jwt);
        //jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        response.addCookie(jwtCookie);
        String frontendUrl = "http:localhost:5173/u";
        response.sendRedirect(frontendUrl);
    }
}