package com.dcg.mvc.courseProgress;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.course.Course;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CourseProgress extends BaseEntity {

    private Long progress;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    private Long accessRange;
}
