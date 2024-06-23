package org.jda.shopswap.oauth2;
import org.jda.shopswap.models.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class UserPrincipal extends DefaultOAuth2User {

    private final User user;

    public UserPrincipal(Collection<? extends GrantedAuthority> authorities, User user, Map<String, Object> attributes) {
        super(authorities, attributes, "username");
        this.user = user;
    }

    public static UserPrincipal create(User user) {
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()));
        return new UserPrincipal(authorities, user, Collections.singletonMap("username", user.getUsername()));
    }

    public User getUser() {
        return user;
    }
}