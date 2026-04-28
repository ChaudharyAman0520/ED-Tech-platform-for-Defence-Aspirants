package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDASubjectResponse;
import com.indianarmy.info_platform.nda.entity.NDASubject;
import com.indianarmy.info_platform.nda.repository.NDASubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NDASubjectService {

    private final NDASubjectRepository repository;

    public List<NDASubjectResponse> getAllSubjects() {

        List<NDASubject> list = repository.findAll();
        List<NDASubjectResponse> responseList = new ArrayList<>();

        for (NDASubject subject : list) {
            NDASubjectResponse response = new NDASubjectResponse(
                    subject.getId(),
                    subject.getName(),
                    subject.getTotalMarks(),
                    subject.getDurationMinutes(),
                    subject.getSyllabusText()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public NDASubject getSubjectById(Long id) {

        Optional<NDASubject> optional = repository.findById(id);

        if (!optional.isPresent()) {
            throw new RuntimeException("Subject not found with id: " + id);
        }

        return optional.get();
    }

    public NDASubject createSubject(NDASubject subject) {

        if (subject.getName() == null || subject.getName().trim().isEmpty()) {
            throw new RuntimeException("Subject name cannot be empty");
        }

        return repository.save(subject);
    }

    public NDASubject updateSubject(Long id, NDASubject updated) {

        Optional<NDASubject> optional = repository.findById(id);

        if (!optional.isPresent()) {
            throw new RuntimeException("Subject not found with id: " + id);
        }

        NDASubject existing = optional.get();

        existing.setName(updated.getName());
        existing.setTotalMarks(updated.getTotalMarks());
        existing.setDurationMinutes(updated.getDurationMinutes());
        existing.setSyllabusText(updated.getSyllabusText());

        return repository.save(existing);
    }

    public void deleteSubject(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Subject not found with id: " + id);
        }

        repository.deleteById(id);
    }
}