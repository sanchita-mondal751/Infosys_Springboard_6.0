package com.example.Auth.service;

import com.example.Auth.entity.User;
import com.example.Auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public boolean login(String email, String password) {
        Optional<User> user = repo.findByEmail(email);
        return user.isPresent() && encoder.matches(password, user.get().getPassword());
    }
}
