package com.example.Auth.repository;

import com.example.Auth.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DriverRepository extends JpaRepository<Driver, Long> {
    List<Driver> findByAvailableTrue();
}
