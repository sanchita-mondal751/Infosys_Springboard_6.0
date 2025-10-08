package com.example.Auth.controller;

import com.example.Auth.dto.RouteRequest;
import com.example.Auth.dto.RouteResponse;
import com.example.Auth.service.RouteOptimizationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/route")
@CrossOrigin(origins = "*")
public class RouteController {

    private final RouteOptimizationService service;

    public RouteController(RouteOptimizationService service) {
        this.service = service;
    }

    @PostMapping("/optimize")
    public RouteResponse optimize(@RequestBody RouteRequest request) {
        return service.optimizeRoute(request);
    }
}
