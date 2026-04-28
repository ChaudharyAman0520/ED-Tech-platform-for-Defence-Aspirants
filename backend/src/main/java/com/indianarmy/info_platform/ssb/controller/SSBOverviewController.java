package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBOverviewResponse;
import com.indianarmy.info_platform.ssb.entity.SSBOverview;
import com.indianarmy.info_platform.ssb.service.SSBOverviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/ssb/overview")
@RequiredArgsConstructor
@Tag(name = "SSB Overview", description = "APIs for SSB overview details")
public class SSBOverviewController {

    private final SSBOverviewService service;

    @Operation(summary = "Get SSB overview details")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBOverviewResponse> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Create SSB overview")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBOverview create(@RequestBody SSBOverview overview) {
        return service.create(overview);
    }
}