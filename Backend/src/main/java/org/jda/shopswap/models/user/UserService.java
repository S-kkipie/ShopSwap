package org.jda.shopswap.models.user;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User createUser(User user, String token){
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        User newUser = User.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .email(user.getEmail())
                .address(user.getAddress())
                .userCreatedId(adminId)
                .role(user.getRole())
                .status(true)
                .build();
        return userRepository.save(newUser);
    }
    public User updateUser(int id, User user, String token){
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        User newDataUser = userRepository.findById(id).orElseThrow();
        newDataUser.setUsername(user.getUsername());
        if (!newDataUser.getPassword().equals(user.getPassword())) {
            newDataUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        newDataUser.setEmail(user.getEmail());
        newDataUser.setUserModifiedId(adminId);
        newDataUser.setAddress(user.getAddress());
        newDataUser.setRole(user.getRole());
        newDataUser.setStatus(user.isEnabled());
        return userRepository.save(newDataUser);
    }
    public User deactivateUser(int id, String token){
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(token));
        User userDeactivate = userRepository.findById(id).orElseThrow();
        userDeactivate.setUserModifiedId(adminId);
        userDeactivate.status = false;
        return userRepository.save(userDeactivate);
    }
}
