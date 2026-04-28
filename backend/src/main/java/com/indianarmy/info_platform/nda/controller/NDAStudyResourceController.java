package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDAStudyResourceResponse;
import com.indianarmy.info_platform.nda.entity.NDAStudyResource;
import com.indianarmy.info_platform.nda.service.NDAStudyResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/nda/resources")
@RequiredArgsConstructor
@Tag(name = "NDA Study Resources", description = "APIs for NDA study materials")
public class NDAStudyResourceController {

    private final NDAStudyResourceService service;

    @Operation(summary = "Get all study resources")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAStudyResourceResponse> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Create new study resource")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAStudyResource create(@RequestBody NDAStudyResource resource) {
        return service.create(resource);
    }

    @Operation(summary = "Update study resource by ID")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDAStudyResource update(@PathVariable Long id,
                                   @RequestBody NDAStudyResource updated) {
        return service.update(id, updated);
    }

    @Operation(summary = "Delete study resource by ID")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @Operation(summary = "Get study resources by subject")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/subject/{subjectId}")
    public List<NDAStudyResource> getBySubject(@PathVariable Long subjectId) {
        return service.getBySubject(subjectId);
    }
}