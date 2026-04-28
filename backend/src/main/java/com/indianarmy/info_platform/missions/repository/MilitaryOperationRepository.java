package com.indianarmy.info_platform.missions.repository;

import com.indianarmy.info_platform.missions.entity.MilitaryOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MilitaryOperationRepository extends JpaRepository<MilitaryOperation, Long> {
    List<MilitaryOperation> findByFeaturedTrue();
}