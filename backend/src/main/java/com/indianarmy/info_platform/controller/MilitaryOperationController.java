package com.indianarmy.info_platform.controller;

import com.indianarmy.info_platform.entity.MilitaryOperation;
import com.indianarmy.info_platform.service.MilitaryOperationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/operations")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Military Operations", description = "APIs for Indian military operations")
public class MilitaryOperationController {

    private final MilitaryOperationService service;

    public MilitaryOperationController(MilitaryOperationService service) {
        this.service = service;
    }

    @Operation(summary = "Get all military operations")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<MilitaryOperation> getAllOperations() {
        return service.getAllOperations();
    }

    @Operation(summary = "Get operation by ID")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/{id}")
    public MilitaryOperation getOperationById(@PathVariable Long id) {
        return service.getOperationById(id);
    }

    @Operation(summary = "Create new military operation")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public MilitaryOperation createOperation(
            @RequestBody MilitaryOperation operation) {
        return service.save(operation);
    }

    @Operation(summary = "Get featured military operations")
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/featured")
    public List<MilitaryOperation> getFeaturedOperations() {
        return service.getFeaturedOperations();
    }
}