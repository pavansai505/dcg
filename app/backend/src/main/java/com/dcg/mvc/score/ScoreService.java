package com.dcg.mvc.score;

import com.dcg.mvc.quiz.Quiz;
import com.dcg.mvc.quiz.QuizRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuizRepository quizRepository;

    public ScoreCheckResponse checkUserScore(Long quizId,String username) {
        User user=userRepository.findByEmail(username).get();
        // Fetch the score if it exists
        Score score = scoreRepository.findByUserIdAndQuizId(user.getId(), quizId).orElse(null);
        System.out.println(username);
        // Return the appropriate response based on whether the score exists
        if (score != null) {
            return new ScoreCheckResponse(true, score.getScoreValue(),quizId);
        } else {
            return new ScoreCheckResponse(false, 0,quizId);
        }
    }

    public ScoreCheckResponse setUserScore(ScoreCheckResponse scoreCheckResponse, String name) {
        User user=userRepository.findByEmail(name).get();
        // Check if a score already exists
        Score existingScore = scoreRepository.findByUserIdAndQuizId(user.getId(), scoreCheckResponse.getQuizId()).orElse(null);
        Quiz quiz=quizRepository.findById(scoreCheckResponse.getQuizId()).get();
        if (existingScore != null) {
            // Update the existing score
            existingScore.setScoreValue(scoreCheckResponse.getValue());
            scoreRepository.save(existingScore);
        } else {
            // Create a new score
            Score newScore = new Score();
            newScore.setUser(user); // Assume you have a method to find user by ID
                newScore.setQuiz(quiz); // Assume you have a method to find quiz by ID
            newScore.setScoreValue(scoreCheckResponse.getValue());
            scoreRepository.save(newScore);
        }

        // Return the updated or newly created score response
        return new ScoreCheckResponse(true, scoreCheckResponse.getValue(),quiz.getId());
    }
    public List<Score> getScoresByQuizId(Long quizId) {
        return scoreRepository.findByQuizId(quizId);
    }
}
