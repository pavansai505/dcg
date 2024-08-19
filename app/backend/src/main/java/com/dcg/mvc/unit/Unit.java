package com.dcg.mvc.unit;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.lecture.Lecture;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"course", "lectures"})
@Entity
public class Unit extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties("units")
    private Course course;

    private Long unitId;
    private String unitTitle;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Lecture> lectures;
}
