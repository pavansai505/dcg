package com.dcg.model;

import com.dcg.mvc.user.User;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.courseProgress.CourseProgress;
import com.dcg.mvc.history.CourseActionHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private Long id;
    private String title;
    private String authorName;
    private String description;
    private String synopsis;
    private String courseCover;
    private double price;
    private String approvalStatus;

    private List<User> users; // List of User entities
    private Set<Unit> units; // Set of Unit entities
    private List<CourseProgress> courseProgresses; // List of CourseProgress entities
    private List<CourseActionHistory> histories; // List of CourseActionHistory entities

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
