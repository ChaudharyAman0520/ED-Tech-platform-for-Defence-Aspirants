package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDAStudyResourceResponse;
import com.indianarmy.info_platform.nda.entity.NDAStudyResource;
import com.indianarmy.info_platform.nda.repository.NDAStudyResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NDAStudyResourceService {

    private final NDAStudyResourceRepository repository;

    public List<NDAStudyResourceResponse> getAll() {

        List<NDAStudyResource> list = repository.findAll();
        List<NDAStudyResourceResponse> responseList = new ArrayList<>();

        for (NDAStudyResource res : list) {
            NDAStudyResourceResponse response = new NDAStudyResourceResponse(
                    res.getId(),
                    res.getTitle(),
                    res.getDescription(),
                    res.getUrl(),
                    res.getResourceType(),
                    res.getSubject().getName()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public NDAStudyResource create(NDAStudyResource resource) {
        return repository.save(resource);
    }

    public NDAStudyResource update(Long id, NDAStudyResource updated) {

        Optional<NDAStudyResource> optional = repository.findById(id);

        if (!optional.isPresent()) {
            throw new RuntimeException("Not found");
        }

        NDAStudyResource existing = optional.get();

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setUrl(updated.getUrl());
        existing.setResourceType(updated.getResourceType());
        existing.setSubject(updated.getSubject());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<NDAStudyResource> getBySubject(Long subjectId) {

        List<NDAStudyResource> list = repository.findBySubjectId(subjectId);
        List<NDAStudyResource> result = new ArrayList<>();

        for (NDAStudyResource res : list) {
            result.add(res);
        }

        return result;
    }
}