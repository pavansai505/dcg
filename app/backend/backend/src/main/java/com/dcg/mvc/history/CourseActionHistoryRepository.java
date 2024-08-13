package com.dcg.mvc.history;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseActionHistoryRepository extends JpaRepository<CourseActionHistory, Integer> {

}
