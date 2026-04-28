package com.indianarmy.info_platform.exam.controller;

import com.indianarmy.info_platform.exam.entity.Test;
import com.indianarmy.info_platform.exam.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam/tests")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    private final TestService testService;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<Test> getAllTests() {
        return testService.getAllTests();
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/{id}")
    public Test getTestById(@PathVariable Long id) {
        return testService.getTestById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Test createTest(@RequestBody Test test) {
        return testService.createTest(test);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{testId}/questions")
    public Test addQuestionsToTest(@PathVariable Long testId, @RequestBody List<Long> questionIds) {
        return testService.addQuestionsToTest(testId, questionIds);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable Long id) {
        try {
            testService.deleteTest(id);
            return ResponseEntity.ok().body("Test deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}