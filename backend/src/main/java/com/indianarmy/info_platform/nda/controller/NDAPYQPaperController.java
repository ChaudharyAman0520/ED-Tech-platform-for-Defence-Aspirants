package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDAPYQPaperResponse;
import com.indianarmy.info_platform.nda.entity.NDAPYQPaper;
import com.indianarmy.info_platform.nda.service.NDAPYQPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/nda/pyq")
@RequiredArgsConstructor
@Tag(name = "NDA PYQ Papers", description = "APIs for previous year question papers")
public class NDAPYQPaperController {

    private final NDAPYQPaperService service;

    @Operation(summary = "Get all PYQ papers")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAPYQPaperResponse> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Create new PYQ paper")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAPYQPaper create(@RequestBody NDAPYQPaper paper) {
        return service.create(paper);
    }

    @Operation(summary = "Get PYQ papers by year")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/year/{year}")
    public List<NDAPYQPaper> getByYear(@PathVariable Integer year) {
        return service.getByYear(year);
    }

    @Operation(summary = "Get PYQ papers by subject")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/subject/{subjectId}")
    public List<NDAPYQPaper> getBySubject(@PathVariable Long subjectId) {
        return service.getBySubject(subjectId);
    }
}