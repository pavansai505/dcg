package com.dcg.mvc.quiz;

import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseRepository;
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

    @Autowired
    private CourseRepository courseRepository;

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
    public Quiz createQuizForCourse(Long courseId, List<Question> questions) {
        // Fetch the Course by its ID
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        // Create the Quiz
        Quiz quiz = Quiz.builder()
                .course(course) // Set the association with the Course
                .questions(questions)
                .build();

        // Save the Quiz
        quizRepository.save(quiz);

        // Add the Quiz to the Course's associated quiz
        course.setQuiz(quiz); // Ensure bidirectional relationship is maintained

        // Save the updated Course
        courseRepository.save(course);

        return quiz;
    }

}
