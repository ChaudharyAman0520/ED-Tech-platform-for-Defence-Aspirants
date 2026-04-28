package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDAExamInfoResponse;
import com.indianarmy.info_platform.nda.entity.NDAExamInfo;
import com.indianarmy.info_platform.nda.service.NDAExamInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/nda/info")
@RequiredArgsConstructor
@Tag(name = "NDA Exam Info", description = "APIs for NDA exam details")
public class NDAExamInfoController {

    private final NDAExamInfoService service;

    @Operation(summary = "Get all NDA exam info")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAExamInfoResponse> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Create new NDA exam info")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAExamInfo create(@RequestBody NDAExamInfo info) {
        return service.create(info);
    }

    @Operation(summary = "Update NDA exam info by ID")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDAExamInfo update(@PathVariable Long id,
                              @RequestBody NDAExamInfo updated) {

        return service.update(id, updated);
    }

    @Operation(summary = "Delete NDA exam info by ID")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}