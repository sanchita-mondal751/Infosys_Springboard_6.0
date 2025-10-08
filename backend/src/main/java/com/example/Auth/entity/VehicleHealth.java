package com.example.Auth.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleHealth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long vehicleId;
    private String vehicleName;
    private String email;

    private int fuelLevel;
    private boolean brakesWorking;
    private boolean acceleratorWorking;
    private boolean engineHealthy;

    private String status;
    private LocalDate lastChecked;
}
