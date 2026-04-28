package com.indianarmy.info_platform.exam.service;

import com.indianarmy.info_platform.exam.entity.Attempt;
import com.indianarmy.info_platform.exam.entity.Question;
import com.indianarmy.info_platform.exam.entity.Test;
import com.indianarmy.info_platform.exam.repository.AttemptRepository;
import com.indianarmy.info_platform.exam.repository.QuestionRepository;
import com.indianarmy.info_platform.exam.repository.TestRepository;
import com.indianarmy.info_platform.nda.entity.NDASubject;
import com.indianarmy.info_platform.nda.repository.NDASubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;
    private final QuestionRepository questionRepository;
    private final NDASubjectRepository subjectRepository;
    private final AttemptRepository attemptRepository;

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
    }

    public Test createTest(Test test) {
        if (test.getSubject() != null && test.getSubject().getId() != null) {
            NDASubject subject = subjectRepository.findById(test.getSubject().getId())
                    .orElseThrow(() -> new RuntimeException("Subject not found"));
            test.setSubject(subject);
        }
        return testRepository.save(test);
    }

    public Test addQuestionsToTest(Long testId, List<Long> questionIds) {
        Test test = getTestById(testId);
        List<Question> questions = questionRepository.findAllById(questionIds);
        test.getQuestions().addAll(questions);

        // Calculate total marks
        int totalMarks = test.getQuestions().stream().mapToInt(Question::getMarks).sum();
        test.setTotalMarks(totalMarks);

        return testRepository.save(test);
    }

    @Transactional
    public void deleteTest(Long id) {
        Test test = getTestById(id);

        // Step 1: Delete all attempts for this test
        List<Attempt> attempts = attemptRepository.findByTestId(id);
        if (!attempts.isEmpty()) {
            attemptRepository.deleteAll(attempts);
        }

        // Step 2: Clear the questions from test (remove from junction table)
        test.getQuestions().clear();
        testRepository.save(test);

        // Step 3: Delete the test
        testRepository.delete(test);
    }
}