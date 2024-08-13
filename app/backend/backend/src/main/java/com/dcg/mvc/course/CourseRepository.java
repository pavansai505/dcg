package com.dcg.mvc.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course,Integer> {

    @Query(value = "select count(*) from course",nativeQuery = true)
    public int getCourseCount();

    List<Course> findByCreatedBy(int id);
}
