package com.example.Auth.service;

import com.example.Auth.dto.Coordinate;
import com.example.Auth.dto.RouteRequest;
import com.example.Auth.dto.RouteResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class RouteOptimizationService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ors.api.key}")
    private String ORS_API_KEY;

    public RouteResponse optimizeRoute(RouteRequest request) {

        String url = "https://api.openrouteservice.org/v2/directions/driving-car";

        Map<String, Object> body = new HashMap<>();
        body.put("coordinates", Arrays.asList(
                Arrays.asList(request.getSourceLng(), request.getSourceLat()),
                Arrays.asList(request.getDestinationLng(), request.getDestinationLat())
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", ORS_API_KEY);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("ORS API error: " + response.getStatusCode());
            }

            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> features = (List<Map<String, Object>>) responseBody.get("features");
            if (features.isEmpty()) throw new RuntimeException("ORS returned empty route.");

            Map<String, Object> route = features.get(0);
            Map<String, Object> properties = (Map<String, Object>) route.get("properties");
            Map<String, Object> summary = (Map<String, Object>) properties.get("summary");
            Map<String, Object> geometry = (Map<String, Object>) route.get("geometry");
            List<List<Double>> coords = (List<List<Double>>) geometry.get("coordinates");

            List<Coordinate> path = new ArrayList<>();
            for (List<Double> point : coords) {
                path.add(new Coordinate(point.get(1), point.get(0))); // lat, lng
            }

            double distance = ((Number) summary.get("distance")).doubleValue() / 1000.0; // km
            double duration = ((Number) summary.get("duration")).doubleValue() / 60.0;   // mins

            return new RouteResponse(distance, duration, "Optimized driving route", path);

        } catch (Exception e) {
            e.printStackTrace();
            // fallback straight line
            List<Coordinate> fallback = Arrays.asList(
                    new Coordinate(request.getSourceLat(), request.getSourceLng()),
                    new Coordinate(request.getDestinationLat(), request.getDestinationLng())
            );
            double latDiff = request.getDestinationLat() - request.getSourceLat();
            double lngDiff = request.getDestinationLng() - request.getSourceLng();
            double distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;
            double duration = distance / 50 * 60;

            return new RouteResponse(distance, duration, "Fallback straight line route", fallback);
        }
    }
}
