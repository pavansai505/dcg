package com.dcg.mvc.course;

import com.dcg.constants.CourseStatus;
import com.dcg.exception.ResourceNotFoundException;
import com.dcg.mvc.history.CourseActionHistory;
import com.dcg.mvc.history.CourseActionHistoryRepository;
import com.dcg.mvc.history.HistoryUpdate;
import com.dcg.mvc.lecture.LectureRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;
    private final CourseActionHistoryRepository courseActionHistoryRepository;

    /**
     * Adds a single course and sets its created by and approval status.
     * @param course The course to be added.
     * @param authentication The authenticated user.
     * @return The added course.
     */
    public Course addCourse(Course course, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        course.setCreatedBy(user.getId());
        course.setAuthorName(user.getFullName());
        course.setApprovalStatus(CourseStatus.PENDING);
        return courseRepository.save(course);
    }

    /**
     * Adds multiple courses and sets their created by and approval status.
     * @param courses The list of courses to be added.
     * @param authentication The authenticated user.
     * @return The list of added courses.
     */
    public List<Course> addMultipleCourses(List<Course> courses, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Course> savedCourses = new ArrayList<>();
        for (Course course : courses) {
            course.setCreatedBy(user.getId());
            course.setAuthorName(user.getFullName());
            course.setApprovalStatus(CourseStatus.PENDING);
            savedCourses.add(courseRepository.save(course));
        }
        return savedCourses;
    }

    /**
     * Retrieves all courses.
     * @return The list of all courses.
     */
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    /**
     * Retrieves a course by its ID.
     * @param id The ID of the course.
     * @return The course with the specified ID or a placeholder if not found.
     */
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(
                Course.builder().title("No Course Found").build()
        );
    }

    public Course getCourseByCourseCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode).orElse(
                Course.builder().title("No Course Found").build()
        );
    }

    /**
     * Retrieves the count of all courses.
     * @return The total number of courses.
     */
    public Long getCourseCount() {
        return courseRepository.getCourseCount();
    }

    /**
     * Retrieves courses created by a specific user.
     * @param userId The ID of the user.
     * @return The list of courses created by the user.
     */
    public List<Course> getCoursesByUserId(Long userId) {
        return courseRepository.findByCreatedBy(userId);
    }

    /**
     * Updates the approval status of a course.
     * @param course The course with updated status.
     */
    public void updateCourseStatus(Course course) {
        Optional<Course> optionalCourse = courseRepository.findById(course.getId());
        if (optionalCourse.isPresent()) {
            Course existingCourse = optionalCourse.get();
            existingCourse.setApprovalStatus(course.getApprovalStatus());
            courseRepository.save(existingCourse);
        } else {
            throw new ResourceNotFoundException("Course not found");
        }
    }

    /**
     * Registers a user to a course.
     * @param courseRegister The course registration details.
     * @param principal The authenticated user.
     * @return The course the user is registered to.
     */
    @Transactional
    public Course registerUserToCourse(CourseRegister courseRegister, UserDetails principal) {
        String courseCode = courseRegister.getCourseCode();
        Optional<Course> optionalCourse = courseRepository.findByCourseCode(courseCode);
        Optional<User> optionalUser = userRepository.findByEmail(principal.getUsername());

        if (optionalCourse.isPresent() && optionalUser.isPresent()) {
            Course course = optionalCourse.get();
            User user = optionalUser.get();
            if (!user.getCourses().contains(course)) {
                user.addCourse(course);
                courseActionHistoryRepository.save(
                        CourseActionHistory.builder().user(user).course(course).build()
                );
                userRepository.save(user);
            }
            return course;
        } else {
            throw new ResourceNotFoundException("Course or User not found");
        }
    }

    /**
     * Checks if a user is registered for a specific course.
     * @param courseRegister The course registration details.
     * @param principal The authenticated user.
     * @return True if the user is registered, otherwise false.
     */
    public boolean isUserRegisteredForCourse(CourseRegister courseRegister, UserDetails principal) {
        Long courseId = courseRegister.getCourseId();
        Optional<Course> optionalCourse = Optional.ofNullable(courseRegister.getCourseCode() != null ?
                courseRepository.findByCourseCode(courseRegister.getCourseCode()) :
                courseRepository.findById(courseId)).orElse(Optional.empty());

        Optional<User> optionalUser = userRepository.findByEmail(principal.getUsername());

        if (optionalCourse.isPresent() && optionalUser.isPresent()) {
            Course course = optionalCourse.get();
            User user = optionalUser.get();
            return user.getCourses().contains(course) || course.getCreatedBy().equals(user.getId()) || user.getRoles().contains("ROLE_ADMIN");
        }
        return false;
    }

    public CourseActionHistory updateCourseHistoryCompletionPercentage(HistoryUpdate historyUpdate, String username) {
        Course course = courseRepository.findById(historyUpdate.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CourseActionHistory courseActionHistoryData = courseActionHistoryRepository.findByUserAndCourse(user, course)
                .orElseThrow(() -> new ResourceNotFoundException("Course action history not found for user and course"));

        courseActionHistoryData.setPercentageCompleted(historyUpdate.getPercentage());
        return courseActionHistoryRepository.save(courseActionHistoryData);
    }

    public CourseActionHistory getCourseActionHistory(Long courseId, String username) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return courseActionHistoryRepository.findByUserAndCourse(user, course)
                .orElseThrow(() -> new ResourceNotFoundException("Course action history not found for user and course"));
    }

    public CourseActionHistory getCourseActionHistoryByCode(String courseCode, String username) {
        Course course = courseRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with code: " + courseCode));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + username));

        return courseActionHistoryRepository.findByUserAndCourse(user, course)
                .orElseThrow(() -> new ResourceNotFoundException("Course action history not found for user and course"));
    }

}
