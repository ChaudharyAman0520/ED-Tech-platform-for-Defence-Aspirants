package com.indianarmy.info_platform.ssb.controller;

import com.indianarmy.info_platform.ssb.dto.SSBResourceResponse;
import com.indianarmy.info_platform.ssb.entity.SSBResource;
import com.indianarmy.info_platform.ssb.service.SSBResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/ssb/resources")
@RequiredArgsConstructor
@Tag(name = "SSB Resources", description = "APIs for SSB preparation resources")
public class SSBResourceController {

    private final SSBResourceService service;

    @Operation(summary = "Get all SSB resources")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<SSBResourceResponse> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Create new SSB resource")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public SSBResource create(@RequestBody SSBResource resource) {
        return service.create(resource);
    }
}