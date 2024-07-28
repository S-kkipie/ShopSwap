package org.jda.shopswap.models.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jda.shopswap.jwt.JwtService;
import org.jda.shopswap.utils.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(path = "/u/models/user")
@RequiredArgsConstructor
public class UserControllerU {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> updateSelfUser(@RequestBody User userData, @RequestHeader String authorization) {
        try {
            Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
            log.info("User: " + userData);
            User updatedUser = userRepository.findById(userId).orElseThrow();
            if (!updatedUser.getProvider().equals("google")) {
                updatedUser.setProvider(userData.getProvider());
            }
            updatedUser.setAddress(userData.getAddress());
            updatedUser.setUsername(userData.getUsername());
            updatedUser.setCity(userData.getCity());
            updatedUser.setCountry(userData.getCountry());
            updatedUser.setEmail(userData.getEmail());
            updatedUser.setPicture(userData.getPicture());
            userRepository.save(updatedUser);
            return ResponseEntity.ok(new MessageResponse("Datos actualizados correctamente"));
        } catch (Exception e) {
            log.error("Error actualizando el usuario: ", e);
            return ResponseEntity.badRequest().body(new MessageResponse("No se encontro el usuario a actualizar"));
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<MessageResponse> changePassword(@RequestBody String lastPassword, @RequestBody String newPassword, @RequestHeader String authorization) {
        try {
            Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
            User updatedUser = userRepository.findById(userId).orElseThrow();
            if (!updatedUser.getPassword().equals(passwordEncoder.encode(lastPassword))) {
                return ResponseEntity.badRequest().body(new MessageResponse("Contraseña anterior incorrecta"));
            }

            return ResponseEntity.ok(new MessageResponse("Contraseña actualizada correctamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("No se encontro el usuario a actualizar"));
        }
    }

    @GetMapping("/self")
    public ResponseEntity<?> getSelfUser(@RequestHeader String authorization) {
        try {
            Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
            User user = userRepository.findById(userId).orElseThrow();
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se encontro el usuario");
        }

    }

    @PutMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody User user, @RequestHeader String authorization) {
        try {
            Long userId = jwtService.getUserIdFromToken(jwtService.getTokenFromHeader(authorization));
            User updatedUser = userRepository.findById(userId).orElseThrow();
            User equal = userRepository.findByEmail(user.getEmail()).orElse(null);
            if(equal != null && equal.getId() != userId){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El email ya está en uso por otro usuario.");
            }
            updatedUser.setEmail(user.getEmail());
            updatedUser.setProvider("google");
            updatedUser.setUsername(user.getUsername());
            updatedUser.setPicture(user.getPicture());
            updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(updatedUser);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}