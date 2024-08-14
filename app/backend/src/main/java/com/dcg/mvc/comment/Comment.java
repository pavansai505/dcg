package com.dcg.mvc.comment;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.lecture.Lecture;
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
public class Comment extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "lecture_id", nullable = false)
    private Lecture lecture;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, length = 1000)
    private String commentText;

}
