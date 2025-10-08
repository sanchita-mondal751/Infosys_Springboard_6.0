// RouteRequest.java
package com.example.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteRequest {
    private double sourceLat;
    private double sourceLng;
    private double destinationLat;
    private double destinationLng;
}
