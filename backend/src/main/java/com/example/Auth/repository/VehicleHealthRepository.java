package com.example.Auth.repository;

import com.example.Auth.entity.VehicleHealth;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VehicleHealthRepository extends JpaRepository<VehicleHealth, Long> {
    List<VehicleHealth> findByEmail(String email);
    Optional<VehicleHealth> findByVehicleId(Long vehicleId);
}
