package com.dcg.mvc.score;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.contest.Contest; // Import Contest entity
import com.dcg.mvc.quiz.Quiz;
import com.dcg.mvc.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Score extends BaseEntity {

    private int scoreValue;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "contest_id")
    private Contest contest; // Association with Contest
}
