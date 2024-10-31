package com.dcg.mvc.unit;

import com.dcg.exception.ResourceNotFoundException;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseRepository;
import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.lecture.LectureRepository;
import com.dcg.mvc.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Transactional
    public Course addUnitToCourse(Unit unit, Long courseId, Authentication connectedUser) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        unit.setCreatedBy(((User) connectedUser.getPrincipal()).getId());
        unit.setCourse(course);
        course.getUnits().add(unit);


        unitRepository.save(unit);
        courseRepository.save(course);

        return course;
    }

    @Transactional
    public Course addMultipleUnitsToCourse(List<Unit> units, Long courseId, Authentication connectedUser) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        for (Unit unit : units) {
            unit.setCreatedBy(((User) connectedUser.getPrincipal()).getId());
            unit.setCourse(course);
            course.getUnits().add(unit);

            unitRepository.save(unit);
        }

        courseRepository.save(course);

        return course;
    }

    @Transactional
    public Course addLectureToUnit(Lecture lecture, Long unitId, Long courseId, Authentication connectedUser) {
        lecture.setCreatedBy(((User) connectedUser.getPrincipal()).getId());
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        if (!course.getUnits().contains(unit)) {
            throw new RuntimeException("Unit does not belong to the course");
        }

        lecture.setUnit(unit);
        unit.getLectures().add(lecture);

        lectureRepository.save(lecture);

        return course;
    }

    @Transactional
    public Course addMultipleLecturesToUnit(List<Lecture> lectures, Long unitId, Long courseId, Authentication connectedUser) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        for (Lecture lecture : lectures) {
            lecture.setCreatedBy(((User) connectedUser.getPrincipal()).getId());
            lecture.setUnit(unit);
            unit.getLectures().add(lecture);
            lectureRepository.save(lecture);
        }

        return course;
    }

    public List<Unit> updateUnits(List<Unit> updatedUnits) {
        // Create a list to hold updated units
        for (Unit updatedUnit : updatedUnits) {
            // Find the existing unit by ID
            Unit existingUnit = unitRepository.findById(updatedUnit.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + updatedUnit.getId()));

            // Check if the existing title is different from the updated title
            if (!existingUnit.getUnitTitle().equals(updatedUnit.getUnitTitle())) {
                // Update the unit's properties (e.g., title)
                existingUnit.setUnitTitle(updatedUnit.getUnitTitle());

                // Save the updated unit back to the repository
                unitRepository.save(existingUnit);
            }
        }
        // Return the list of updated units
        return updatedUnits;
    }
}
