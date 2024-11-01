package com.dcg.mvc.contest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface ContestRepository extends JpaRepository<Contest,Long> {
    @Modifying
    @Query("UPDATE Contest c SET c.status = CASE WHEN c.startDate > :now THEN 'UPCOMING' " +
            "WHEN c.startDate <= :now AND c.endDate >= :now THEN 'ONGOING' " +
            "ELSE 'COMPLETED' END " +
            "WHERE c.status <> 'COMPLETED' AND c.endDate >= :now")
    void updateContestStatuses(@Param("now") LocalDateTime now);

}
