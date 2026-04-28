package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDAPYQPaperResponse;
import com.indianarmy.info_platform.nda.entity.NDAPYQPaper;
import com.indianarmy.info_platform.nda.repository.NDAPYQPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NDAPYQPaperService {

    private final NDAPYQPaperRepository repository;

    public List<NDAPYQPaperResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(pyq -> new NDAPYQPaperResponse(
                        pyq.getId(),
                        pyq.getYear(),
                        pyq.getSession(),
                        pyq.getPdfUrl(),
                        pyq.getSubject() != null ? pyq.getSubject().getName() : "No Subject"  // ✅ Fixed null check
                ))
                .toList();
    }

    public NDAPYQPaper create(@RequestBody NDAPYQPaper paper){
        return repository.save(paper);
    }

    public List<NDAPYQPaper> getByYear(Integer year) {
        return repository.findByYear(year);
    }

    public List<NDAPYQPaper> getBySubject(Long subjectId) {
        return repository.findBySubjectId(subjectId);
    }

    public void delete(Long id) {
        NDAPYQPaper pyq = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("PYQ not found with id: " + id));
        repository.delete(pyq);
    }
}