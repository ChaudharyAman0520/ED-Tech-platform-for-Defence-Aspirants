package com.indianarmy.info_platform.ssb.service;

import com.indianarmy.info_platform.ssb.dto.SSBResourceResponse;
import com.indianarmy.info_platform.ssb.entity.SSBResource;
import com.indianarmy.info_platform.ssb.repository.SSBResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SSBResourceService {

    private final SSBResourceRepository repository;

    public List<SSBResourceResponse> getAll() {

        List<SSBResource> list = repository.findAll();
        List<SSBResourceResponse> responseList = new ArrayList<>();

        for (SSBResource r : list) {
            SSBResourceResponse response = new SSBResourceResponse(
                    r.getId(),
                    r.getTitle(),
                    r.getDescription(),
                    r.getUrl(),
                    r.getResourceType()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public SSBResource create(SSBResource resource) {
        return repository.save(resource);
    }
}