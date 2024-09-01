package com.dcg.mvc.score;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScoreCheckResponse {
    private boolean userHaveScore;
    private int value;
    private Long quizId;
}
