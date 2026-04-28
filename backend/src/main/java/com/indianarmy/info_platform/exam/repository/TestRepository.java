package com.indianarmy.info_platform.exam.repository;

import com.indianarmy.info_platform.exam.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findBySubjectId(Long subjectId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM test_questions WHERE question_id = :questionId", nativeQuery = true)
    void removeQuestionFromAllTests(@Param("questionId") Long questionId);
}