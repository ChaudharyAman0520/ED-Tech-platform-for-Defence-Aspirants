package com.indianarmy.info_platform.exam.controller;

import com.indianarmy.info_platform.exam.entity.Attempt;
import com.indianarmy.info_platform.exam.service.AttemptService;
import com.indianarmy.info_platform.security.JwtService;
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

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @PostMapping("/start")
    public Attempt startAttempt(@RequestParam Long testId, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);
        // Get user by email (you'll need to add this method to UserRepository)
        Long userId = 1L; // TODO: Get actual user ID from email
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
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);
        Long userId = 1L; // TODO: Get actual user ID from email
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
}