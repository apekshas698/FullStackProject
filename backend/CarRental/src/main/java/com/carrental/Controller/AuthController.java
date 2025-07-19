package com.carrental.Controller;

import com.carrental.Model.User;
import com.carrental.Repo.UserRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.security.Keys;


import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    // 🔐 Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isEmpty() || !optionalUser.get().getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Invalid credentials");
        }

        User user = optionalUser.get();

        // 🔑 Generate JWT token
        String token = Jwts.builder()
                .setSubject(email)
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                .signWith(Keys.hmacShaKeyFor("your-256-bit-secret-your-256-bit-secret".getBytes()), SignatureAlgorithm.HS256)
                .compact();

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole()
        ));
    }
}
