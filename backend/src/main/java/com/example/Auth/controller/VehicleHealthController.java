package com.example.Auth.controller;

import com.example.Auth.entity.VehicleHealth;
import com.example.Auth.service.VehicleHealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class VehicleHealthController {

    private final VehicleHealthService service;

    @PostMapping("/update")
    public ResponseEntity<VehicleHealth> updateHealth(@RequestBody VehicleHealth vh) {
        return ResponseEntity.ok(service.saveOrUpdate(vh));
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<VehicleHealth>> getHealth(@PathVariable String email) {
        return ResponseEntity.ok(service.getHealthByUser(email));
    }
}
