package com.dcg.mvc.history;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class CourseActionHistory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties("units")
    private Course course;

    private boolean returned;
    private boolean returnApproved;

    @Column(name = "percentage_completed", nullable = false, columnDefinition = "int default 0") // Add this line
    private int percentageCompleted = 0; // Default value set to 0
}
