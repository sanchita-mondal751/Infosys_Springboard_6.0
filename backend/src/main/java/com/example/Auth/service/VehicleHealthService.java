package com.example.Auth.service;

import com.example.Auth.entity.VehicleHealth;
import com.example.Auth.repository.VehicleHealthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleHealthService {

    private final VehicleHealthRepository repo;

    // Get all vehicle health records for a user
    public List<VehicleHealth> getHealthByUser(String email) {
        return repo.findByEmail(email);
    }

    // Save new health record or update existing one
    public VehicleHealth saveOrUpdate(VehicleHealth vh) {
        Optional<VehicleHealth> existing = repo.findByVehicleId(vh.getVehicleId());

        if (existing.isPresent()) {
            VehicleHealth old = existing.get();
            old.setFuelLevel(vh.getFuelLevel());
            old.setBrakesWorking(vh.isBrakesWorking());
            old.setAcceleratorWorking(vh.isAcceleratorWorking());
            old.setEngineHealthy(vh.isEngineHealthy());
            old.setStatus(vh.getStatus());
            old.setLastChecked(LocalDate.now());
            return repo.save(old);
        }

        vh.setLastChecked(LocalDate.now());
        return repo.save(vh);
    }
}
