package com.indianarmy.info_platform.nda.service;

import com.indianarmy.info_platform.nda.dto.NDAPYQPaperResponse;
import com.indianarmy.info_platform.nda.entity.NDAPYQPaper;
import com.indianarmy.info_platform.nda.repository.NDAPYQPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NDAPYQPaperService {

    private final NDAPYQPaperRepository repository;

    public List<NDAPYQPaperResponse> getAll() {

        List<NDAPYQPaper> list = repository.findAll();
        List<NDAPYQPaperResponse> responseList = new ArrayList<>();

        for (NDAPYQPaper pyq : list) {
            NDAPYQPaperResponse response = new NDAPYQPaperResponse(
                    pyq.getId(),
                    pyq.getYear(),
                    pyq.getSession(),
                    pyq.getPdfUrl(),
                    pyq.getSubject().getName()
            );
            responseList.add(response);
        }

        return responseList;
    }

    public NDAPYQPaper create(NDAPYQPaper paper) {
        return repository.save(paper);
    }

    public List<NDAPYQPaper> getByYear(Integer year) {

        List<NDAPYQPaper> list = repository.findByYear(year);
        List<NDAPYQPaper> result = new ArrayList<>();

        for (NDAPYQPaper pyq : list) {
            result.add(pyq);
        }

        return result;
    }

    public List<NDAPYQPaper> getBySubject(Long subjectId) {

        List<NDAPYQPaper> list = repository.findBySubjectId(subjectId);
        List<NDAPYQPaper> result = new ArrayList<>();

        for (NDAPYQPaper pyq : list) {
            result.add(pyq);
        }

        return result;
    }
}