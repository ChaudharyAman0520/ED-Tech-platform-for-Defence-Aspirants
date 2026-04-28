package com.indianarmy.info_platform.exam.repository;

import com.indianarmy.info_platform.exam.entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByUserId(Long userId);
    List<Attempt> findByTestId(Long testId);


}