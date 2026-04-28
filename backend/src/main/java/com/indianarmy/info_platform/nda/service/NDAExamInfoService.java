package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDAExamInfoResponse;
import com.indianarmy.info_platform.nda.entity.NDAExamInfo;
import com.indianarmy.info_platform.nda.repository.NDAExamInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NDAExamInfoService {

    private final NDAExamInfoRepository repository;

    public List<NDAExamInfoResponse> getAll() {

        List<NDAExamInfo> list = repository.findAll();
        List<NDAExamInfoResponse> responseList = new ArrayList<>();

        for (NDAExamInfo info : list) {
            NDAExamInfoResponse response = new NDAExamInfoResponse(
                    info.getId(),
                    info.getIntroduction(),
                    info.getConductingBody(),
                    info.getOfficialWebsite(),
                    info.getExamFrequency()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public NDAExamInfo create(NDAExamInfo info) {
        return repository.save(info);
    }

    public NDAExamInfo update(Long id, NDAExamInfo updated) {

        Optional<NDAExamInfo> optional = repository.findById(id);

        if (!optional.isPresent()) {
            throw new RuntimeException("Not found");
        }

        NDAExamInfo existing = optional.get();

        existing.setIntroduction(updated.getIntroduction());
        existing.setConductingBody(updated.getConductingBody());
        existing.setOfficialWebsite(updated.getOfficialWebsite());
        existing.setExamFrequency(updated.getExamFrequency());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}