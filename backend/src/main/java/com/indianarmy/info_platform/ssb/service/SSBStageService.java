package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBStageResponse;
import com.indianarmy.info_platform.ssb.entity.SSBStage;
import com.indianarmy.info_platform.ssb.repository.SSBStageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBStageService {

    private final SSBStageRepository repository;

    public List<SSBStageResponse> getAllStages() {

        List<SSBStage> list = repository.findAll();
        List<SSBStageResponse> responseList = new ArrayList<>();

        for (SSBStage stage : list) {
            SSBStageResponse response = new SSBStageResponse(
                    stage.getId(),
                    stage.getStageName(),
                    stage.getDayNumber(),
                    stage.getDescription()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public SSBStage createStage(SSBStage stage) {
        return repository.save(stage);
    }
}