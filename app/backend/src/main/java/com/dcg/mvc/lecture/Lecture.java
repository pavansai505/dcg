package com.dcg.mvc.lecture;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.unit.Unit;
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
    @JoinColumn(name = "unit_id")
    @JsonIgnoreProperties("lectures")
    private Unit unit;
    private int lessonId;
    private String lessonTitle;
    private String lessonActivityName;
    private String lessonNotes;
    private String lessonVideo;
    private String lessonObjectives;
    private boolean enable;
}
