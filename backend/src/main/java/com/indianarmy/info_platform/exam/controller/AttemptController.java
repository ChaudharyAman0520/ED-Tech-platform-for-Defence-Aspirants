package com.indianarmy.info_platform.exam.controller;

import com.indianarmy.info_platform.exam.entity.Attempt;
import com.indianarmy.info_platform.exam.service.AttemptService;
import com.indianarmy.info_platform.security.JwtService;
import com.indianarmy.info_platform.user.entity.User;
import com.indianarmy.info_platform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exam/attempts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AttemptController {

    private final AttemptService attemptService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @PostMapping("/start")
    public Attempt startAttempt(@RequestParam Long testId, @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        return attemptService.startAttempt(userId, testId);
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @PostMapping("/{attemptId}/submit")
    public Attempt submitAttempt(@PathVariable Long attemptId, @RequestBody Map<Long, String> answers) {
        return attemptService.submitAttempt(attemptId, answers);
    }

    @PreAuthorize("hasRole('ASPIRANT')")
    @GetMapping("/my-attempts")
    public List<Attempt> getMyAttempts(@RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        return attemptService.getUserAttempts(userId);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-attempts")
    public List<Attempt> getAllAttempts() {
        return attemptService.getAllAttempts();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/test/{testId}/results")
    public List<Attempt> getTestResults(@PathVariable Long testId) {
        return attemptService.getAttemptsByTest(testId);
    }

    private Long extractUserId(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found for token");
        }

        return user.getId();
    }
}