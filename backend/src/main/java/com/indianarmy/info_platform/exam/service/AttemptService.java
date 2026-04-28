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

    @Transactional
    public Attempt startAttempt(Long userId, Long testId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Test test = testService.getTestById(testId);

        Attempt attempt = Attempt.builder()
                .user(user)
                .test(test)
                .startedAt(LocalDateTime.now())
                .build();

        return attemptRepository.save(attempt);
    }

    @Transactional
    public Attempt submitAttempt(Long attemptId, Map<Long, String> answers) {
        Attempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        int totalMarks = 0;
        int earnedMarks = 0;

        for (Question question : attempt.getTest().getQuestions()) {
            String userAnswer = answers.get(question.getId());
            boolean isCorrect = userAnswer != null &&
                    userAnswer.equalsIgnoreCase(question.getCorrectAnswer());

            UserAnswer userAnswerEntity = UserAnswer.builder()
                    .attempt(attempt)
                    .question(question)
                    .selectedAnswer(userAnswer)
                    .isCorrect(isCorrect)
                    .build();

            userAnswerRepository.save(userAnswerEntity);
            attempt.getAnswers().add(userAnswerEntity);

            totalMarks += question.getMarks();
            if (isCorrect) earnedMarks += question.getMarks();
        }

        int percentage = (int) ((double) earnedMarks / totalMarks * 100);
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