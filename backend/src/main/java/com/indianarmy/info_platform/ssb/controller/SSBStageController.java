package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBStageResponse;
import com.indianarmy.info_platform.ssb.entity.SSBStage;
import com.indianarmy.info_platform.ssb.service.SSBStageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/ssb/stages")
@RequiredArgsConstructor
@Tag(name = "SSB Stages", description = "APIs for SSB selection stages")
public class SSBStageController {

    private final SSBStageService service;

    @Operation(summary = "Get all SSB stages")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBStageResponse> getAll() {
        return service.getAllStages();
    }

    @Operation(summary = "Create new SSB stage")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBStage create(@RequestBody SSBStage stage) {
        return service.createStage(stage);
    }
}