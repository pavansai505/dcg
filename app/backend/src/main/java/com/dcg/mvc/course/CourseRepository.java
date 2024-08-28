package com.dcg.mvc.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {

    @Query(value = "select count(*) from course",nativeQuery = true)
    public Long getCourseCount();

    List<Course> findByCreatedBy(Long id);

    Optional<Course> findByCourseCode(String courseCode);
}
