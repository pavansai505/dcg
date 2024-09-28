package com.dcg.mvc.lectureProgress;

import com.dcg.response.CustomResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lecture-progress")
public class LectureProgressController {

    private final LectureProgressService lectureProgressService;

    public LectureProgressController(LectureProgressService lectureProgressService) {
        this.lectureProgressService = lectureProgressService;
    }

    @PostMapping("/mark-viewed/{lectureId}")
    public ResponseEntity<LectureProgress> markLectureAsViewed(@PathVariable Long lectureId, Authentication authentication) {
        lectureProgressService.markLectureAsViewed(lectureId,((UserDetails) authentication.getPrincipal()).getUsername());
        return ResponseEntity.ok(null);
    }

    @GetMapping("/is-viewed/{lectureId}")
    public ResponseEntity<CustomResponse> isLectureViewedByUser(@PathVariable Long lectureId, Authentication authentication) {
        boolean isViewed = lectureProgressService.isLectureViewedByUser(lectureId,((UserDetails) authentication.getPrincipal()).getUsername());
        return ResponseEntity.ok(CustomResponse.builder().isResultTrue(isViewed).build());
    }
}
