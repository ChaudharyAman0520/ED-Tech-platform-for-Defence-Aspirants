package com.indianarmy.info_platform.exam.repository;

import com.indianarmy.info_platform.exam.entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByUserId(Long userId);
    List<Attempt> findByTestId(Long testId);
    Optional<Attempt> findByUserIdAndTestIdAndCompletedAtIsNull(Long userId, Long testId);

}