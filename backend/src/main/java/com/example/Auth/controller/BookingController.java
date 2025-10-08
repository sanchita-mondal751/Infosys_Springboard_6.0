package com.example.Auth.controller;

import com.example.Auth.entity.Booking;
import com.example.Auth.entity.Driver;
import com.example.Auth.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/drivers")
    public List<Driver> getAvailableDrivers() {
        return bookingService.getAvailableDrivers();
    }

    @PostMapping("/book")
    public Booking bookDriver(@RequestBody Map<String, Object> request) {
        Object driverIdObj = request.get("driverId");
        if (driverIdObj == null || driverIdObj.toString().isEmpty()) {
            throw new RuntimeException("Driver must be selected");
        }

        Long driverId = Long.valueOf(driverIdObj.toString());
        String customerName = (String) request.get("customerName");
        String customerEmail = (String) request.get("customerEmail");
        String source = (String) request.get("source");
        String destination = (String) request.get("destination");

        return bookingService.bookDriver(driverId, customerName, customerEmail, source, destination);
    }
}
