package com.example.Auth.service;

import com.example.Auth.entity.Booking;
import com.example.Auth.entity.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private JavaMailSender mailSender;

    // In-memory drivers list
    private List<Driver> drivers;

    public BookingService() {
        drivers = new ArrayList<>();
        drivers.add(new Driver(1L, "John Doe", "1234567890", "placeholder@example.com", true));
        drivers.add(new Driver(2L, "Alice Smith", "9876543210", "placeholder@example.com", true));
        drivers.add(new Driver(3L, "Bob Johnson", "5555555555", "placeholder@example.com", true));
    }

    // Get available drivers
    public List<Driver> getAvailableDrivers() {
        List<Driver> available = new ArrayList<>();
        for (Driver d : drivers) {
            if (d.isAvailable()) available.add(d);
        }
        return available;
    }

    // Book driver
    public Booking bookDriver(Long driverId, String customerName, String customerEmail, String source, String destination) {
        Driver driver = drivers.stream()
                .filter(d -> d.getId().equals(driverId) && d.isAvailable())
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Driver not available"));

        // Mark driver unavailable
        driver.setAvailable(false);

        Booking booking = new Booking();
        booking.setCustomerName(customerName);
        booking.setCustomerEmail(customerEmail);
        booking.setSource(source);
        booking.setDestination(destination);
        booking.setBookingTime(LocalDateTime.now());
        booking.setDriver(driver);

        sendEmailToDriver(driver, booking); // Email goes to your email now
        return booking; // no DB save needed
    }

    private void sendEmailToDriver(Driver driver, Booking booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("aec.cse.sanchitamondal@gmail.com");
            message.setTo("aec.cse.sanchitamondal@gmail.com"); // 👈 all emails go to your email
            message.setSubject("🚖 New Ride Booking for " + driver.getName());
            message.setText("Hello " + driver.getName() + ",\n\nYou have a new booking:\n" +
                    "Pickup: " + booking.getSource() + "\n" +
                    "Drop: " + booking.getDestination() + "\n" +
                    "Customer: " + booking.getCustomerName() + "\n" +
                    "Contact: " + booking.getCustomerEmail() + "\n\n" +
                    "Please confirm soon.\n\nThank you!");
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + "aec.cse.sanchitamondal@gmail.com");
        } catch (Exception e) {
            System.err.println("❌ Failed to send email to " + "aec.cse.sanchitamondal@gmail.com");
            e.printStackTrace();
        }
    }
}
