package com.dcg.mvc.lecture;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.lectureProgress.LectureProgress;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.comment.Comment;
import com.dcg.mvc.quiz.Quiz;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"unit", "comments", "quizzes"})
@Entity
public class Lecture extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "unit_id")
    @JsonIgnoreProperties("lectures")
    @JsonIgnore
    private Unit unit;

    private Long lessonId;
    private String lessonTitle;
    @Column(columnDefinition = "LONGTEXT")
    private String lessonNotes;
    private String lessonVideo;
    private boolean enable;

    @Column(columnDefinition = "LONGTEXT")
    private String code;

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("lecture")
    private Set<Comment> comments;

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("lecture")
    @OrderBy("createdDate ASC") // Change to DESC for descending order
    private Set<Quiz> quizzes; // One-to-many relationship with Quiz
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private boolean disabled;
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LectureProgress> lectureProgresses = new ArrayList<>();

}
