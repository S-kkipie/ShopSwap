package org.jda.shopswap.models.user;

import lombok.RequiredArgsConstructor;
import org.jda.shopswap.Jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/api/models/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/saveUser")
    public User saveUser(@RequestBody User userData, @RequestHeader String authorization) {
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = User.builder()
                .username(userData.getUsername())
                .password(passwordEncoder.encode(userData.getPassword()))
                .email(userData.getEmail())
                .address(userData.getAddress())
                .userCreatedId(adminId)
                .role(userData.getRole())
                .status(true)
                .build();
        return userRepository.save(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User userData, @RequestHeader String authorization) {
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(id).orElseThrow();
        user.setUsername(userData.getUsername());
        if (!userData.getPassword().equals(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(userData.getPassword()));
        }
        user.setEmail(userData.getEmail());
        user.setUserModifiedId(adminId);
        user.setAddress(userData.getAddress());
        user.setRole(userData.getRole());
        user.setStatus(userData.isEnabled());
        return userRepository.save(user);
    }

    @PutMapping("/deactivate/{id}")
    public User deactivateUser(@PathVariable int id, @RequestHeader String authorization) {
        Long adminId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
        User user = userRepository.findById(id).orElseThrow();
        user.setUserModifiedId(adminId);
        user.status = false;
        return userRepository.save(user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
}
