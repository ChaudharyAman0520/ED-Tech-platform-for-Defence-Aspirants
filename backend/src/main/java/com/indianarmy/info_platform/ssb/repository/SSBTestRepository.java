package com.indianarmy.info_platform.ssb.repository;

import com.indianarmy.info_platform.ssb.entity.SSBTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SSBTestRepository extends JpaRepository<SSBTest, Long> {

    List<SSBTest> findByStageId(Long stageId);

}