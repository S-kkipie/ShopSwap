package org.jda.shopswap.models.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/public/models/user")
public class UserControllerPublic {
    private final UserRepository userRepository;
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        User userToReturn = User.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .city(user.getCity())
                .country(user.getCountry())
                .picture(user.getPicture())
                .status(user.getStatus())
                .role(user.getRole())
                .build();
        return ResponseEntity.ok(userToReturn);
    }
}
