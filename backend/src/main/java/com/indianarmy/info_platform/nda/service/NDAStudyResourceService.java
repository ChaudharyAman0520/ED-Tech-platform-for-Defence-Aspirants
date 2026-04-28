package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDAStudyResourceResponse;
import com.indianarmy.info_platform.nda.entity.NDAStudyResource;
import com.indianarmy.info_platform.nda.repository.NDAStudyResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NDAStudyResourceService {
    private final NDAStudyResourceRepository repository;

    public List<NDAStudyResourceResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(res -> new NDAStudyResourceResponse(
                        res.getId(),
                        res.getTitle(),
                        res.getDescription(),
                        res.getUrl(),
                        res.getResourceType(),
                        res.getSubject() != null ? res.getSubject().getName() : "No Subject"  // ✅ Fixed null check
                ))
                .toList();
    }

    public NDAStudyResource create(@RequestBody NDAStudyResource resource) {
        return repository.save(resource);
    }

    public NDAStudyResource update(@PathVariable Long id,
                                   @RequestBody NDAStudyResource updated) {
        NDAStudyResource existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setUrl(updated.getUrl());
        existing.setResourceType(updated.getResourceType());
        existing.setSubject(updated.getSubject());
        return repository.save(existing);
    }

    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    public List<NDAStudyResource> getBySubject(Long subjectId) {
        return repository.findBySubjectId(subjectId);
    }
}