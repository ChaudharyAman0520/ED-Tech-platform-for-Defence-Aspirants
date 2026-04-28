package com.indianarmy.info_platform.missions.controller;

import com.indianarmy.info_platform.missions.entity.MilitaryOperation;
import com.indianarmy.info_platform.missions.service.MilitaryOperationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations")
@CrossOrigin(origins = "http://localhost:5173")
public class MilitaryOperationController {

    private final MilitaryOperationService service;

    public MilitaryOperationController(MilitaryOperationService service) {
        this.service = service;
    }

    // PUBLIC (both admin & aspirant)
    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping
    public List<MilitaryOperation> getAllOperations() {
        return service.getAllOperations();
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/{id}")
    public MilitaryOperation getOperationById(@PathVariable Long id) {
        return service.getOperationById(id);
    }

    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public MilitaryOperation createOperation(@RequestBody MilitaryOperation operation) {
        return service.save(operation);
    }

    // ✅ ADD THIS - UPDATE OPERATION
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public MilitaryOperation updateOperation(@PathVariable Long id, @RequestBody MilitaryOperation operation) {
        return service.updateOperation(id, operation);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteOperation(@PathVariable Long id) {
        service.deleteOperation(id);
        return "Operation deleted successfully";
    }

    @PreAuthorize("hasAnyRole('ADMIN','ASPIRANT')")
    @GetMapping("/featured")
    public List<MilitaryOperation> getFeaturedOperations() {
        return service.getFeaturedOperations();
    }
}