package com.dcg.mvc.lecture;

import com.dcg.exception.ResourceNotFoundException;
import com.dcg.mvc.unit.Unit;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Lecture updateLecture(Long lectureId, LectureUpdateRequest updatedLecture) {
        // Find the existing lecture by ID
        Lecture existingLecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new ResourceNotFoundException("Lecture not found with id: " + lectureId));

        // Update allowed fields only
        existingLecture.setLessonTitle(updatedLecture.getLessonTitle());
        existingLecture.setLessonNotes(updatedLecture.getLessonNotes());
        existingLecture.setLessonVideo(updatedLecture.getLessonVideo());
        existingLecture.setCode(updatedLecture.getCode());

        // Save updated lecture to the database
        return lectureRepository.save(existingLecture);
    }
}
