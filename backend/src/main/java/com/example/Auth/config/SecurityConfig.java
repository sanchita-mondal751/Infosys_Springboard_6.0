package com.example.Auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())   // ❌ disable CSRF (safe for APIs in dev)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()   // ✅ allow all requests
                )
                .formLogin(form -> form.disable()) // disable login form
                .httpBasic(basic -> basic.disable()); // disable basic auth too
        return http.build();
    }
}
