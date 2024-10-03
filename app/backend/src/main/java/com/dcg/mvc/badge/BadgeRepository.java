package com.dcg.mvc.badge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {

    /**
     * Finds all badges associated with a specific course.
     *
     * @param courseId The ID of the course.
     * @return A set of badges associated with the course.
     */
    Badge findBadgesByCourseId(Long courseId);

    /**
     * Finds all badges associated with a specific user.
     *
     * @param userId The ID of the user.
     * @return A set of badges associated with the user.
     */
    Set<Badge> findBadgesByUsersId(Long userId);

    Optional<Badge> findByCourseId(Long courseId);
}
