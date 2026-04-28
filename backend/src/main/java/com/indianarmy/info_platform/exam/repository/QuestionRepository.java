package com.indianarmy.info_platform.exam.repository;

import com.indianarmy.info_platform.exam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySubjectId(Long subjectId);
    List<Question> findByDifficulty(String difficulty);
}