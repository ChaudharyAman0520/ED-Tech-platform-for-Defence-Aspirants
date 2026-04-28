package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDASubjectResponse;
import com.indianarmy.info_platform.nda.entity.NDASubject;
import com.indianarmy.info_platform.nda.service.NDASubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/nda/subjects")
@RequiredArgsConstructor
@Tag(name = "NDA Subjects", description = "APIs for NDA subjects")
public class NDASubjectController {

    private final NDASubjectService service;

    @Operation(summary = "Get all NDA subjects")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDASubjectResponse> getAll() {
        return service.getAllSubjects();
    }

    @Operation(summary = "Get subject by ID")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/{id}")
    public NDASubject getById(@PathVariable Long id) {
        return service.getSubjectById(id);
    }

    @Operation(summary = "Create new subject")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDASubject create(@RequestBody NDASubject subject) {
        return service.createSubject(subject);
    }

    @Operation(summary = "Update subject by ID")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDASubject update(@PathVariable Long id,
                             @RequestBody NDASubject subject) {
        return service.updateSubject(id, subject);
    }

    @Operation(summary = "Delete subject by ID")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteSubject(id);
    }
}