package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBStageResponse;
import com.indianarmy.info_platform.ssb.entity.SSBStage;
import com.indianarmy.info_platform.ssb.repository.SSBStageRepository;
import com.indianarmy.info_platform.ssb.repository.SSBTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBStageService {

    private final SSBStageRepository repository;
    private final SSBTestRepository testRepository;

    public List<SSBStageResponse> getAllStages() {
        return repository.findAll()
                .stream()
                .map(stage -> new SSBStageResponse(
                        stage.getId(),
                        stage.getStageName(),
                        stage.getDayNumber(),
                        stage.getDescription()
                ))
                .toList();
    }

    public SSBStage createStage(SSBStage stage) {
        return repository.save(stage);
    }

    public SSBStage updateStage(Long id, SSBStage updatedStage) {
        SSBStage existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stage not found with id: " + id));

        existing.setStageName(updatedStage.getStageName());
        existing.setDayNumber(updatedStage.getDayNumber());
        existing.setDescription(updatedStage.getDescription());

        return repository.save(existing);
    }

    public void deleteStage(Long id) {
        List<?> tests = testRepository.findByStageId(id);
        if (!tests.isEmpty()) {
            throw new RuntimeException("Cannot delete stage. Tests are linked to it.");
        }
        repository.deleteById(id);
    }
}