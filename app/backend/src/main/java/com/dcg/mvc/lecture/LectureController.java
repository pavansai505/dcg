package com.dcg.mvc.lecture;

import com.dcg.mvc.unit.Unit;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lecture")
@RequiredArgsConstructor
public class LectureController {
    private final LectureService lectureService;

    @PatchMapping("/{lectureId}/toggle/status")
    public ResponseEntity<Lecture> toggleStatus(@PathVariable Long lectureId) {
        return ResponseEntity.ok(lectureService.toggleLecture(lectureId));
    }
}
