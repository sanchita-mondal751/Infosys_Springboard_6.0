package com.example.Auth.controller;

import com.example.Auth.entity.User;
import com.example.Auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React frontend
public class AuthController {
    @Autowired
    private UserService service;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        service.register(user);
        return "Registered successfully ✅";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        boolean success = service.login(user.getEmail(), user.getPassword());
        return success ? "success" : "error";
    }
}
