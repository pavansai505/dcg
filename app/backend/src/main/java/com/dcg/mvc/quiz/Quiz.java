package com.dcg.mvc.quiz;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.question.Question;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Quiz extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "lecture_id")
    @JsonIgnoreProperties("quizzes")
    private Lecture lecture;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private List<Question> questions; // List of questions with options and correct answers
}
