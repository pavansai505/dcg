package com.dcg.mvc.course;

import com.dcg.mapper.CourseMapper;
import com.dcg.model.CourseDTO;
import com.dcg.model.CourseRegister;
import com.dcg.model.RegistrationStatusResponse;
import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.unit.UnitService;
import com.dcg.mvc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final UnitService unitService;
    private final CourseMapper courseMapper;

    /**
     * Endpoint to add a single course.
     * @param course The course to be added.
     * @param connectedUser The authenticated user.
     * @return The added course.
     */
    @PostMapping("/add")
    public ResponseEntity<Course> saveCourse(@RequestBody Course course, Authentication connectedUser) {
        Course savedCourse = courseService.addCourse(course, connectedUser);
        return ResponseEntity.ok(savedCourse);
    }

    /**
     * Endpoint to add multiple courses.
     * @param courses The list of courses to be added.
     * @param connectedUser The authenticated user.
     * @return The list of added courses.
     */
    @PostMapping("/addMultiple")
    public ResponseEntity<List<Course>> saveCourses(@RequestBody List<Course> courses, Authentication connectedUser) {
        List<Course> savedCourses = courseService.addMultipleCourses(courses, connectedUser);
        return ResponseEntity.ok(savedCourses);
    }

    /**
     * Endpoint to add a unit to a course.
     * @param unit The unit to be added.
     * @param courseId The ID of the course to which the unit will be added.
     * @param connectedUser The authenticated user.
     * @return The updated course with the new unit.
     */
    @PostMapping("/unit/add/{courseId}")
    public ResponseEntity<Course> addUnit(
            @RequestBody Unit unit,
            @PathVariable Long courseId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addUnitToCourse(unit, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * Endpoint to add multiple units to a course.
     * @param units The list of units to be added.
     * @param courseId The ID of the course to which the units will be added.
     * @param connectedUser The authenticated user.
     * @return The updated course with the new units.
     */
    @PostMapping("/units/addMultiple/{courseId}")
    public ResponseEntity<Course> addMultipleUnits(
            @RequestBody List<Unit> units,
            @PathVariable Long courseId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addMultipleUnitsToCourse(units, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * Endpoint to add a lecture to a unit within a course.
     * @param lecture The lecture to be added.
     * @param courseId The ID of the course containing the unit.
     * @param unitId The ID of the unit to which the lecture will be added.
     * @param connectedUser The authenticated user.
     * @return The updated course with the new lecture.
     */
    @PostMapping("/lectures/add/{courseId}/{unitId}")
    public ResponseEntity<Course> saveLecture(
            @RequestBody Lecture lecture,
            @PathVariable Long courseId,
            @PathVariable Long unitId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addLectureToUnit(lecture, unitId, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * Endpoint to add multiple lectures to a unit within a course.
     * @param lectures The list of lectures to be added.
     * @param courseId The ID of the course containing the unit.
     * @param unitId The ID of the unit to which the lectures will be added.
     * @param connectedUser The authenticated user.
     * @return The updated course with the new lectures.
     */
    @PostMapping("/lectures/addMultiple/{courseId}/{unitId}")
    public ResponseEntity<Course> saveMultipleLecturesToUnit(
            @RequestBody List<Lecture> lectures,
            @PathVariable Long courseId,
            @PathVariable Long unitId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addMultipleLecturesToUnit(lectures, unitId, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * Endpoint to get all courses.
     * @return The list of all courses.
     */
    @GetMapping("/get")
    public ResponseEntity<List<Course>> getCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    /**
     * Endpoint to get a course by its ID.
     * @param id The ID of the course.
     * @return The course with the specified ID.
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(courseMapper.toDTO(course));
    }

    /**
     * Endpoint to get courses by the logged-in user's ID, returning DTOs.
     * @param currentUser The authenticated user.
     * @return The list of courses for the logged-in user as DTOs.
     */
    @GetMapping("/getByUserId")
    public ResponseEntity<List<CourseDTO>> getCoursesByLoggedInUserId(Authentication currentUser) {
        User user = (User) currentUser.getPrincipal();
        List<Course> courses = courseService.getCoursesByUserId(user.getId());

        // Convert List<Course> to List<CourseDTO>
        List<CourseDTO> courseDTOs = courses.stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(courseDTOs);
    }

    /**
     * Endpoint to get courses by a user's ID.
     * @param id The ID of the user.
     * @return The list of courses for the specified user.
     */
    @GetMapping("/getByUserId/{id}")
    public ResponseEntity<List<Course>> getCoursesByUserId(@PathVariable Long id) {
        List<Course> courses = courseService.getCoursesByUserId(id);
        return ResponseEntity.ok(courses);
    }

    /**
     * Endpoint to get the count of all courses.
     * @return The total number of courses.
     */
    @GetMapping("/getCourseCount")
    public ResponseEntity<Long> getCourseCount() {
        Long count = courseService.getCourseCount();
        return ResponseEntity.ok(count);
    }

    /**
     * Endpoint to register a user to a course.
     * @param courseRegister The course registration details.
     * @param authentication The authenticated user.
     * @return The updated course with the new registration.
     */
    @PutMapping("/register")
    public ResponseEntity<Course> registerUserToCourse(
            @RequestBody CourseRegister courseRegister,
            Authentication authentication) {
        Course updatedCourse = courseService.registerUserToCourse(courseRegister, (UserDetails) authentication.getPrincipal());
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * Endpoint to check if a user is registered for a course.
     * @param courseRegister The course registration details.
     * @param authentication The authenticated user.
     * @return The registration status response.
     */
    @PostMapping("/is-registered")
    public ResponseEntity<RegistrationStatusResponse> isUserRegistered(
            @RequestBody CourseRegister courseRegister,
            Authentication authentication) {
        boolean isRegistered = courseService.isUserRegisteredForCourse(courseRegister, (UserDetails) authentication.getPrincipal());
        RegistrationStatusResponse response = RegistrationStatusResponse.builder().isRegistered(isRegistered).build();
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint to update the approval status of a course.
     * @param course The course with the updated status.
     * @return A message indicating the success of the operation.
     */
    @PutMapping("/updateCourseApproval")
    public ResponseEntity<Map<String, String>> updateCourseStatus(@RequestBody Course course) {
        courseService.updateCourseStatus(course);
        Map<String, String> map = new HashMap<>();
        map.put("Message", "Success");
        return ResponseEntity.ok(map);
    }
}
