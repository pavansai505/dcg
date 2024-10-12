package com.dcg.mvc.history;

import com.dcg.mvc.course.Course;
import com.dcg.mvc.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseActionHistoryRepository extends JpaRepository<CourseActionHistory, Long> {

    Optional<CourseActionHistory> findByUserAndCourse(User user, Course course);
}
