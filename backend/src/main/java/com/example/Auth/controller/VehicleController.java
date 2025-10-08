package com.example.Auth.controller;

import com.example.Auth.entity.Vehicle;
import com.example.Auth.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    // Add a vehicle
    @PostMapping("/add/{email}")
    public ResponseEntity<Vehicle> addVehicle(@PathVariable String email, @RequestBody Vehicle vehicle) {
        Vehicle savedVehicle = vehicleService.addVehicle(email, vehicle);
        return ResponseEntity.ok(savedVehicle);
    }

    // Get all vehicles for a user
    @GetMapping("/{email}")
    public ResponseEntity<List<Vehicle>> getVehicles(@PathVariable String email) {
        List<Vehicle> vehicles = vehicleService.getVehicles(email);
        return ResponseEntity.ok(vehicles);
    }

    // Delete a vehicle
    @DeleteMapping("/{email}/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String email, @PathVariable Long id) {
        vehicleService.deleteVehicle(id, email);
        return ResponseEntity.ok().build(); // returns 200 OK
    }
}
