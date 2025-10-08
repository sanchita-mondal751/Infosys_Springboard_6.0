package com.example.Auth.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OpenAiService {

    @Value("${spring.ai.openai.api-key:}")
    private String openAiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    public String summarizeRoute(String source, String destination, double distanceKm, double durationMin) {
        if (openAiApiKey == null || openAiApiKey.isBlank()) {
            return "";
        }

        try {
            String url = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openAiApiKey);

            String userPrompt = String.format(
                    "You are an AI travel assistant. Analyze the optimized driving route from \"%s\" to \"%s\". " +
                            "Distance: %.2f km. Duration: %.1f minutes. " +
                            "Provide a short 2-3 sentence summary including route highlights, possible traffic concerns, and travel tips.",
                    source, destination, distanceKm, durationMin
            );

            List<Map<String, Object>> messages = List.of(
                    Map.of("role", "system", "content", "You are a concise assistant that writes short, useful travel summaries."),
                    Map.of("role", "user", "content", userPrompt)
            );

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-3.5-turbo");
            body.put("messages", messages);
            body.put("max_tokens", 200);
            body.put("temperature", 0.6);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> resp = restTemplate.postForEntity(url, entity, String.class);

            if (resp.getStatusCode() != HttpStatus.OK) return "";

            JsonNode root = mapper.readTree(resp.getBody());
            return root.path("choices").get(0).path("message").path("content").asText("").trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
