package com.dcg.mvc.lecture;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.course.Course;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Lecture extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties("lectures")
    private Course course;
    private int unitId;
    private String unitTitle;
    private int lessonId;
    private String lessonTitle;
    private String lessonActivityName;
    private String lessonNotes;
    private String lessonVideo;
    private String lessonObjectives;
    private boolean enable;
}
