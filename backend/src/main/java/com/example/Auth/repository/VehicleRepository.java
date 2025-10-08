package com.example.Auth.repository;

import com.example.Auth.entity.Vehicle;
import com.example.Auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByUser(User user);
}
