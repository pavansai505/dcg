package com.dcg.mvc.course;

import com.dcg.constants.enums.CourseLevel;
import com.dcg.mvc.badge.Badge;
import com.dcg.mvc.user.User;
import com.dcg.mvc.unit.Unit;
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
    private Badge badge;
    private CourseLevel courseLevel;
    private List<String> tags;
    private List<String> endGoals;
    private String courseCode;

    private List<User> users; // List of User entities
    private Set<Unit> units; // Set of Unit entities
    private List<CourseActionHistory> histories; // List of CourseActionHistory entities

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
