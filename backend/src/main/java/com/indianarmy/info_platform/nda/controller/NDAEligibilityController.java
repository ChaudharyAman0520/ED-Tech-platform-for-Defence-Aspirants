package com.indianarmy.info_platform.nda.controller;

import com.indianarmy.info_platform.nda.dto.NDAEligibilityResponse;
import com.indianarmy.info_platform.nda.entity.NDAEligibility;
import com.indianarmy.info_platform.nda.service.NDAEligibilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/nda/eligibility")
@RequiredArgsConstructor
@Tag(name = "NDA Eligibility", description = "APIs for managing NDA eligibility criteria")
public class NDAEligibilityController {

    private final NDAEligibilityService service;

    @Operation(summary = "Get all NDA eligibility details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<NDAEligibilityResponse> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Create new eligibility record")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Created successfully"),
            @ApiResponse(responseCode = "403", description = "Only admin allowed")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public NDAEligibility create(@RequestBody NDAEligibility eligibility) {
        return service.create(eligibility);
    }

    @Operation(summary = "Update eligibility by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Updated successfully"),
            @ApiResponse(responseCode = "404", description = "Not found")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public NDAEligibility update(@PathVariable Long id,
                                 @RequestBody NDAEligibility updated) {
        return service.update(id, updated);
    }

    @Operation(summary = "Delete eligibility by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Not found")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}