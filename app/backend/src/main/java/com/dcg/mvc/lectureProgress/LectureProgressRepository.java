package com.dcg.mvc.lectureProgress;

import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LectureProgressRepository extends JpaRepository<LectureProgress, Long> {

    Optional<LectureProgress> findByUserAndLecture(User user, Lecture lecture);
}