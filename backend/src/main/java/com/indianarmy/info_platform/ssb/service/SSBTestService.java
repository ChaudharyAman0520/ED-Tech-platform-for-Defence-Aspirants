package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBTestResponse;
import com.indianarmy.info_platform.ssb.entity.SSBTest;
import com.indianarmy.info_platform.ssb.repository.SSBTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBTestService {

    private final SSBTestRepository repository;

    public List<SSBTestResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(test -> new SSBTestResponse(
                        test.getId(),
                        test.getTestName(),
                        test.getDescription(),
                        test.getTips(),
                        test.getStage().getStageName()
                ))
                .toList();
    }

    public List<SSBTest> getTestsByStage(Long stageId) {
        return repository.findByStageId(stageId);
    }

    public SSBTest create(SSBTest test) {
        return repository.save(test);
    }

    public SSBTest updateTest(Long id, SSBTest updatedTest) {
        SSBTest existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + id));

        existing.setTestName(updatedTest.getTestName());
        existing.setDescription(updatedTest.getDescription());
        existing.setTips(updatedTest.getTips());
        existing.setStage(updatedTest.getStage());

        return repository.save(existing);
    }

    public void deleteTest(Long id) {
        repository.deleteById(id);
    }
}