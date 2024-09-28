package com.dcg.mvc.contest;

import com.dcg.mvc.quiz.Quiz;
import com.dcg.mvc.quiz.QuizRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContestService {

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private QuizRepository quizRepository;



    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Contest createContest(CreateContestRequest request,String username) {
        // Fetch the user who created the contest
        User createdBy = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create and save the quiz
        Quiz quiz = Quiz.builder().lecture(null).questions(request.getQuestions()).build();
        quiz = quizRepository.save(quiz);

        // Convert questions from DTO to entity and save them

        // Create the contest
        Contest contest = Contest.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .maxParticipants(request.getMaxParticipants())
                .createdByUser(createdBy)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .quiz(quiz)
                .build();
        // Save the contest
        return contestRepository.save(contest);
    }

    @Transactional(readOnly = true)
    public List<Contest> getAllContests() {
        return contestRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Contest getContestById(Long id) {
        return contestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contest not found"));
    }

    @Transactional
    public void registerUserForContest(Long contestId, String username) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new RuntimeException("Contest not found"));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (contest.getParticipants().contains(user)) {
            throw new RuntimeException("User is already registered for this contest");
        }

        if (contest.getParticipants().size() >= contest.getMaxParticipants()) {
            throw new RuntimeException("Contest is full");
        }

        contest.getParticipants().add(user);
        user.getContests().add(contest);

        contestRepository.save(contest);
        userRepository.save(user);
    }
    @Transactional
    public boolean isUserRegisteredForContest(Long contestId, String username) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new RuntimeException("Contest not found"));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

       return contest.getParticipants().contains(user);
    }

}
