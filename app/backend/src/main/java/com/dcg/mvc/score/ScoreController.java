package com.dcg.mvc.score;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @GetMapping("/checkScore")
    public ScoreCheckResponse checkUserScore(@RequestParam Long quizId, Authentication authentication) {
        return scoreService.checkUserScore(quizId,authentication.getName());
    }

    @PostMapping("/setScore")
    public ScoreCheckResponse setUserScore(@RequestBody ScoreCheckResponse scoreCheckResponse,Authentication authentication) {
        return scoreService.setUserScore(scoreCheckResponse,authentication.getName());
    }
    @GetMapping("/scores-by-quiz")
    public List<Score> getScoresByQuizId(@RequestParam Long quizId) {
        return scoreService.getScoresByQuizId(quizId);
    }
}
