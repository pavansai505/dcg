package com.dcg.mapper;

import com.dcg.model.CourseDTO;
import com.dcg.mvc.course.Course;
import org.springframework.stereotype.Component;

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
                course.getHistories(), // Directly including CourseActionHistory entities
                course.getCreatedDate(),
                course.getLastModifiedDate()
        );
    }
}
