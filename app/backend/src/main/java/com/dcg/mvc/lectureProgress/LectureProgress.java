package com.dcg.mvc.lectureProgress;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.lecture.Lecture;
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
@ToString(exclude = {"user", "lecture"})
@Entity
public class LectureProgress extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("lectureProgresses")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    @JsonIgnoreProperties("lectureProgresses")
    private Lecture lecture;

    private boolean viewed;

    // Utility methods for managing bidirectional relationships
    public void markAsViewed() {
        this.viewed = true;
    }

    public void markAsNotViewed() {
        this.viewed = false;
    }
}
