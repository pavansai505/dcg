package com.dcg.mvc.history;

import com.dcg.mvc.course.Course;
import com.dcg.mvc.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseActionHistoryRepository extends JpaRepository<CourseActionHistory, Long> {

    CourseActionHistory findByUserAndCourse(User user, Course course);
}
