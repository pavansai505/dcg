package com.dcg.mapper;

import com.dcg.model.CourseDTO;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.courseProgress.CourseProgress;
import com.dcg.mvc.history.CourseActionHistory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }

        return new CourseDTO(
                course.getId(),
                course.getTitle(),
                course.getAuthorName(),
                course.getDescription(),
                course.getSynopsis(),
                course.getCourseCover(),
                course.getPrice(),
                course.getApprovalStatus(),
                course.getUser(), // Directly including User entities
                course.getUnits(), // Directly including Unit entities
                course.getCourseProgresses(), // Directly including CourseProgress entities
                course.getHistories(), // Directly including CourseActionHistory entities
                course.getCreatedDate(),
                course.getLastModifiedDate()
        );
    }
}
