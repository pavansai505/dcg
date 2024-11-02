package com.dcg.mvc.lecture;

import com.dcg.mvc.unit.Unit;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lecture")
@RequiredArgsConstructor
public class LectureController {
    private final LectureService lectureService;

    @PatchMapping("/{lectureId}/toggle/status")
    public ResponseEntity<Lecture> toggleStatus(@PathVariable Long lectureId) {
        return ResponseEntity.ok(lectureService.toggleLecture(lectureId));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Lecture> updateLecture(@PathVariable Long id, @RequestBody LectureUpdateRequest updateRequest) {
        Lecture updatedLecture = lectureService.updateLecture(id, updateRequest);
        return new ResponseEntity<>(updatedLecture, HttpStatus.OK);
    }
}
