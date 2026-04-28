package com.indianarmy.info_platform.exam.controller;

import com.indianarmy.info_platform.exam.entity.Question;
import com.indianarmy.info_platform.exam.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionService questionService;

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/subject/{subjectId}")
    public List<Question> getQuestionsBySubject(@PathVariable Long subjectId) {
        return questionService.getQuestionsBySubject(subjectId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        return questionService.updateQuestion(id, question);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.ok().body("Question deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}