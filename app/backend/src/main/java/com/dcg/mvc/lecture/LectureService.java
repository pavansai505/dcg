package com.dcg.mvc.lecture;

import com.dcg.exception.ResourceNotFoundException;
import com.dcg.mvc.unit.Unit;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LectureService {
    private final LectureRepository lectureRepository;
    @Secured("ROLE_INSTRUCTOR")
    public Lecture toggleLecture(Long id){
        Lecture lecture=lectureRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Unit not found"));
        lecture.setDisabled(!lecture.isDisabled());
        return lectureRepository.save(lecture);
    }
}
