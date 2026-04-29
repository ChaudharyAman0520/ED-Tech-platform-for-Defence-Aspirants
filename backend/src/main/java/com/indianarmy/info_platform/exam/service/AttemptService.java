package com.indianarmy.info_platform.exam.service;

import com.indianarmy.info_platform.exam.entity.Attempt;
import com.indianarmy.info_platform.exam.entity.Question;
import com.indianarmy.info_platform.exam.entity.Test;
import com.indianarmy.info_platform.exam.entity.UserAnswer;
import com.indianarmy.info_platform.exam.repository.AttemptRepository;
import com.indianarmy.info_platform.exam.repository.UserAnswerRepository;
import com.indianarmy.info_platform.user.entity.User;
import com.indianarmy.info_platform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AttemptService {

    private final AttemptRepository attemptRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final UserRepository userRepository;
    private final TestService testService;

    public Attempt startAttempt(Long userId, Long testId) {
        Attempt attempt = attemptRepository
                .findByUserIdAndTestIdAndCompletedAtIsNull(userId, testId)
                .orElse(null);

        if (attempt != null) {
            return attempt;
        }

        return createAttempt(userId, testId);
    }

    private Attempt createAttempt(Long userId, Long testId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Test test = testService.getTestById(testId);

        if (test.getQuestions() == null || test.getQuestions().isEmpty()) {
            throw new RuntimeException("Test has no questions");
        }

        Attempt attempt = Attempt.builder()
                .user(user)
                .test(test)
                .startedAt(LocalDateTime.now())
                .build();

        return attemptRepository.save(attempt);
    }

    public Attempt submitAttempt(Long attemptId, Map<Long, String> answers) {
        Attempt attempt = attemptRepository.findById(attemptId).orElse(null);

        if (attempt == null) {
            throw new RuntimeException("Attempt not found");
        }

        if (attempt.getCompletedAt() != null) {
            throw new RuntimeException("Attempt already submitted");
        }

        int totalMarks = 0;
        int earnedMarks = 0;

        for (Question question : attempt.getTest().getQuestions()) {
            String userAnswer = answers.get(question.getId());

            boolean isCorrect = false;
            if (userAnswer != null &&
                    userAnswer.equalsIgnoreCase(question.getCorrectAnswer())) {
                isCorrect = true;
            }

            UserAnswer userAnswerEntity = UserAnswer.builder()
                    .attempt(attempt)
                    .question(question)
                    .selectedAnswer(userAnswer)
                    .isCorrect(isCorrect)
                    .build();

            userAnswerRepository.save(userAnswerEntity);
            attempt.getAnswers().add(userAnswerEntity);

            totalMarks += question.getMarks();
            if (isCorrect) {
                earnedMarks += question.getMarks();
            }
        }

        int percentage;
        if (totalMarks == 0) {
            percentage = 0;
        } else {
            percentage = (int) ((double) earnedMarks / totalMarks * 100);
        }

        attempt.setScore(earnedMarks);
        attempt.setPercentage(percentage);
        attempt.setCompletedAt(LocalDateTime.now());

        return attemptRepository.save(attempt);
    }

    public List<Attempt> getUserAttempts(Long userId) {
        return attemptRepository.findByUserId(userId);
    }

    public List<Attempt> getAllAttempts() {
        return attemptRepository.findAll();
    }

    public List<Attempt> getAttemptsByTest(Long testId) {
        return attemptRepository.findByTestId(testId);
    }
}