package com.indianarmy.info_platform.exam.repository;

import com.indianarmy.info_platform.exam.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByQuestionId(Long questionId);
}