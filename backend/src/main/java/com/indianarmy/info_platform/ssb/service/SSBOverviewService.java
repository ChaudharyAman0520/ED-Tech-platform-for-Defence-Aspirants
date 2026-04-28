package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBOverviewResponse;
import com.indianarmy.info_platform.ssb.entity.SSBOverview;
import com.indianarmy.info_platform.ssb.repository.SSBOverviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBOverviewService {

    private final SSBOverviewRepository repository;

    public List<SSBOverviewResponse> getAll() {

        List<SSBOverview> list = repository.findAll();
        List<SSBOverviewResponse> responseList = new ArrayList<>();

        for (SSBOverview o : list) {
            SSBOverviewResponse response = new SSBOverviewResponse(
                    o.getId(),
                    o.getIntroduction(),
                    o.getPurpose(),
                    o.getSelectionProcessSummary(),
                    o.getOfficialWebsite()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public SSBOverview create(SSBOverview overview) {
        return repository.save(overview);
    }
}