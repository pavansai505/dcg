package com.dcg.mvc.lectureProgress;

import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import com.dcg.mvc.lecture.LectureRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LectureProgressService {

    private final LectureProgressRepository lectureProgressRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    public LectureProgressService(LectureProgressRepository lectureProgressRepository, UserRepository userRepository, LectureRepository lectureRepository) {
        this.lectureProgressRepository = lectureProgressRepository;
        this.userRepository = userRepository;
        this.lectureRepository = lectureRepository;
    }

    @Transactional
    public void markLectureAsViewed(Long lectureId,String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new IllegalArgumentException("Lecture not found"));

        Optional<LectureProgress> existingProgress = lectureProgressRepository.findByUserAndLecture(user, lecture);

        LectureProgress progress = existingProgress.orElseGet(() -> LectureProgress.builder().user(user).lecture(lecture).build());
        progress.markAsViewed();

        lectureProgressRepository.save(progress);
    }

    public boolean isLectureViewedByUser(Long lectureId,String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new IllegalArgumentException("Lecture not found"));

        return lectureProgressRepository.findByUserAndLecture(user, lecture)
                .map(LectureProgress::isViewed)
                .orElse(false);
    }
}
