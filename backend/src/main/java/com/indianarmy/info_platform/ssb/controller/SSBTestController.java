package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBTestResponse;
import com.indianarmy.info_platform.ssb.entity.SSBTest;
import com.indianarmy.info_platform.ssb.service.SSBTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/ssb/tests")
@RequiredArgsConstructor
@Tag(name = "SSB Tests", description = "APIs for SSB test details")
public class SSBTestController {

    private final SSBTestService service;

    @Operation(summary = "Get all SSB tests")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBTestResponse> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Get tests by stage")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/stage/{stageId}")
    public List<SSBTest> getByStage(@PathVariable Long stageId) {
        return service.getTestsByStage(stageId);
    }

    @Operation(summary = "Create new SSB test")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBTest create(@RequestBody SSBTest test) {
        return service.create(test);
    }
}