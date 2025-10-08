package com.example.Auth.service;

import com.example.Auth.entity.User;
import com.example.Auth.entity.Vehicle;
import com.example.Auth.repository.UserRepository;
import com.example.Auth.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public VehicleService(VehicleRepository vehicleRepository, UserRepository userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    public Vehicle addVehicle(String email, Vehicle vehicle) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        vehicle.setUser(user);
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getVehicles(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return vehicleRepository.findByUser(user);
    }

    public void deleteVehicle(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Vehicle> vehicle = vehicleRepository.findById(id);

        if (vehicle.isPresent() && vehicle.get().getUser().getId().equals(user.getId())) {
            vehicleRepository.delete(vehicle.get());
        } else {
            throw new RuntimeException("Vehicle not found or unauthorized");
        }
    }
}
