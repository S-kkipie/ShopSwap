package org.jda.shopswap.oauth2;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.models.user.Role;
import org.jda.shopswap.models.user.User;
import org.jda.shopswap.models.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService {

    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(CustomOAuth2UserService.class);

    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        log.info("Load user {}", oAuth2UserRequest);
        DefaultOAuth2UserService defaultOAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = defaultOAuth2UserService.loadUser(oAuth2UserRequest);
        return processOAuth2User(oAuth2UserRequest, oAuth2User);
    }
    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        User user = User.builder()
                .username(oAuth2User.getAttribute("name"))
                .email(oAuth2User.getAttribute("email"))
                .role(Role.USER)
                .status(true)
                .address("No address")
                .password(UUID.randomUUID().toString())
                .build();

        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        log.info("User info: {}", user);

        return userOptional
                .map(existingUser -> {
                    log.info("Updating existing user: {}", existingUser);
                    return updateExistingUser(existingUser, user);
                })
                .orElseGet(() -> {
                    log.info("Registering new user: {}", user);
                    return registerNewUser(oAuth2UserRequest, user);
                });
    }

    private UserPrincipal updateExistingUser(User existingUser, User user) {
        existingUser.setUsername(user.getUsername());
        User updatedUser = userRepository.save(existingUser);
        return UserPrincipal.create(updatedUser);
    }

    private UserPrincipal registerNewUser(OAuth2UserRequest oAuth2UserRequest, User user) {
        user.setProvider(oAuth2UserRequest.getClientRegistration().getRegistrationId());
        User newUser = userRepository.save(user);
        return UserPrincipal.create(newUser);
    }
}

