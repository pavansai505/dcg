package com.dcg.mvc.quiz;

import com.dcg.mvc.question.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("add/{lectureId}")
    public ResponseEntity<Quiz> createQuiz(@PathVariable Long lectureId, @RequestBody List<Question> questions) {
        Quiz createdQuiz = quizService.createQuizForLecture(lectureId, questions);
        return ResponseEntity.ok(null);
    }
}
