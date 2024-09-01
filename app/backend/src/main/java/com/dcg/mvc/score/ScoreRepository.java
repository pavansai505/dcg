package com.dcg.mvc.score;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Optional<Score> findByUserIdAndQuizId(Long userId, Long quizId);
    List<Score> findByQuizId(Long quizId);
}
