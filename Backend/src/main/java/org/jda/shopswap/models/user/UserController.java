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
    private final UserService userService;

    @PostMapping("/saveUser")
    public User saveUser(@RequestBody User userData, @RequestHeader String authorization) {
        return userService.createUser(userData, authorization);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User userData, @RequestHeader String authorization) {
        return userService.updateUser(id, userData, authorization);
    }

    @PutMapping("/deactivate/{id}")
    public User deactivateUser(@PathVariable int id, @RequestHeader String authorization) {
        return userService.deactivateUser(id, authorization);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
}
