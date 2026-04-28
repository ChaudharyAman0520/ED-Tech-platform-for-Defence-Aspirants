package com.indianarmy.info_platform.missions.service;

import com.indianarmy.info_platform.missions.entity.MilitaryOperation;
import com.indianarmy.info_platform.missions.repository.MilitaryOperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MilitaryOperationService {

    private final MilitaryOperationRepository repository;

    public MilitaryOperationService(MilitaryOperationRepository repository) {
        this.repository = repository;
    }

    // List page
    public List<MilitaryOperation> getAllOperations() {
        return repository.findAll();
    }

    // Detail page
    public MilitaryOperation getOperationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Operation not found with id: " + id));
    }

    public List<MilitaryOperation> getFeaturedOperations() {
        return repository.findByFeaturedTrue();
    }

    // Create operation
    public MilitaryOperation save(MilitaryOperation operation) {
        return repository.save(operation);
    }


    public MilitaryOperation updateOperation(Long id, MilitaryOperation updatedOperation) {
        MilitaryOperation existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operation not found with id: " + id));

        existing.setOperationName(updatedOperation.getOperationName());
        existing.setYear(updatedOperation.getYear());
        existing.setLocation(updatedOperation.getLocation());
        existing.setObjective(updatedOperation.getObjective());
        existing.setOutcome(updatedOperation.getOutcome());
        existing.setFeatured(updatedOperation.isFeatured());

        return repository.save(existing);
    }

    public void deleteOperation(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Operation not found with id: " + id);
        }
        repository.deleteById(id);
    }
}