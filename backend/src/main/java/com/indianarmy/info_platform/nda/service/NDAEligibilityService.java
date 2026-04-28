package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDAEligibilityResponse;
import com.indianarmy.info_platform.nda.entity.NDAEligibility;
import com.indianarmy.info_platform.nda.repository.NDAEligibilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NDAEligibilityService {

    private final NDAEligibilityRepository repository;

    public List<NDAEligibilityResponse> getAll() {

        List<NDAEligibility> list = repository.findAll();
        List<NDAEligibilityResponse> responseList = new ArrayList<>();

        for (NDAEligibility e : list) {
            NDAEligibilityResponse response = new NDAEligibilityResponse(
                    e.getId(),
                    e.getMinAge(),
                    e.getMaxAge(),
                    e.getEducationRequirement(),
                    e.getNationality(),
                    e.getMaritalStatus()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public NDAEligibility create(NDAEligibility eligibility) {
        return repository.save(eligibility);
    }

    public NDAEligibility update(Long id, NDAEligibility updated) {

        Optional<NDAEligibility> optional = repository.findById(id);

        if (!optional.isPresent()) {
            throw new RuntimeException("Not found");
        }

        NDAEligibility existing = optional.get();

        existing.setMinAge(updated.getMinAge());
        existing.setMaxAge(updated.getMaxAge());
        existing.setEducationRequirement(updated.getEducationRequirement());
        existing.setNationality(updated.getNationality());
        existing.setMaritalStatus(updated.getMaritalStatus());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}