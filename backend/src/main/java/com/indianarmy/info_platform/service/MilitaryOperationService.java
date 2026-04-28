package com.indianarmy.info_platform.service;

import com.indianarmy.info_platform.entity.MilitaryOperation;
import com.indianarmy.info_platform.repository.MilitaryOperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MilitaryOperationService {

    private final MilitaryOperationRepository repository;

    public MilitaryOperationService(MilitaryOperationRepository repository) {
        this.repository = repository;
    }

    public List<MilitaryOperation> getAllOperations() {
        return repository.findAll();
    }

    public MilitaryOperation getOperationById(Long id) {
        Optional<MilitaryOperation> optionalOperation = repository.findById(id);

        if (optionalOperation.isPresent()) {
            return optionalOperation.get();
        } else {
            throw new RuntimeException("Operation not found with id: " + id);
        }
    }

    public List<MilitaryOperation> getFeaturedOperations() {
        return repository.findByFeaturedTrue();
    }

    public MilitaryOperation save(MilitaryOperation operation) {
        return repository.save(operation);
    }
}