package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBTestResponse;
import com.indianarmy.info_platform.ssb.entity.SSBTest;
import com.indianarmy.info_platform.ssb.repository.SSBTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBTestService {

    private final SSBTestRepository repository;

    public List<SSBTestResponse> getAll() {

        List<SSBTest> list = repository.findAll();
        List<SSBTestResponse> responseList = new ArrayList<>();

        for (SSBTest test : list) {
            SSBTestResponse response = new SSBTestResponse(
                    test.getId(),
                    test.getTestName(),
                    test.getDescription(),
                    test.getTips(),
                    test.getStage().getStageName()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public List<SSBTest> getTestsByStage(Long stageId) {

        List<SSBTest> list = repository.findByStageId(stageId);
        List<SSBTest> result = new ArrayList<>();

        for (SSBTest test : list) {
            result.add(test);
        }

        return result;
    }

    public SSBTest create(SSBTest test) {
        return repository.save(test);
    }
}