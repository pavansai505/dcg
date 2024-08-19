package com.dcg.mvc.quiz;

import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.lecture.LectureRepository;
import com.dcg.mvc.question.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private LectureRepository lectureRepository;

    public Quiz createQuizForLecture(Long lectureId, List<Question> questions) {
        // Fetch the Lecture by its ID
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new RuntimeException("Lecture not found with id: " + lectureId));

        // Create the Quiz
        Quiz quiz = Quiz.builder()
                .lecture(lecture) // Set the association with the Lecture
                .questions(questions)
                .build();

        // Save the Quiz
        quizRepository.save(quiz);

        // Add the Quiz to the Lecture's list of quizzes
        lecture.getQuizzes().add(quiz);

        // Save the updated Lecture
        lectureRepository.save(lecture);

        return quiz;
    }
}
