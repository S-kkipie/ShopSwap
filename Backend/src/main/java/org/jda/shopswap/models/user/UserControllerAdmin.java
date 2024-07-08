package org.jda.shopswap.models.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/admin/models/user")
public class UserControllerAdmin {
    @Autowired
    private UserRepository userRepository;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> saveUser(@RequestBody User userData, @RequestHeader String authorization) {
        User newUser = userService.createUser(userData, authorization);
        if(newUser == null) {
            return ResponseEntity.badRequest().body("Ya hay un usuario con ese email");
        }
        return ResponseEntity.ok("Usuario creado exitosamente.");
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userData, @RequestHeader String authorization) {
        return userService.updateUser(id, userData, authorization);
    }

    @PutMapping("/deactivate/{id}")
    public User deactivateUser(@PathVariable Long id, @RequestHeader String authorization) {
        return userService.deactivateUser(id, authorization);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
