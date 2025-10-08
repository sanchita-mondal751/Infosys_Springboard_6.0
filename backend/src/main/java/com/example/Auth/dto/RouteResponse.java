// RouteResponse.java
package com.example.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponse {
    private double distance; // in km
    private double duration; // in minutes
    private String optimizedRoute;
    private List<Coordinate> geometry;
}
