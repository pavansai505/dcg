package com.dcg.mvc.course;

import com.dcg.model.CourseRegister;
import com.dcg.model.RegistrationStatusResponse;
import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.unit.UnitService;
import com.dcg.mvc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final UnitService unitService;

    @PostMapping("/add")
    public ResponseEntity<Course> saveCourse(@RequestBody Course course, Authentication connectedUser) {
        Course savedCourse = courseService.addCourse(course, connectedUser);
        return ResponseEntity.ok(savedCourse);
    }

    @PostMapping("/addMultiple")
    public ResponseEntity<List<Course>> saveCourses(@RequestBody List<Course> courses, Authentication connectedUser) {
        List<Course> savedCourses = courseService.addMultipleCourses(courses, connectedUser);
        return ResponseEntity.ok(savedCourses);
    }

    @PostMapping("/unit/add/{courseId}")
    public ResponseEntity<Course> addUnit(
            @RequestBody Unit unit,
            @PathVariable int courseId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addUnitToCourse(unit, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    @PostMapping("/units/addMultiple/{courseId}")
    public ResponseEntity<Course> addMultipleUnits(
            @RequestBody List<Unit> units,
            @PathVariable int courseId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addMultipleUnitsToCourse(units, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    @PostMapping("/lectures/add/{courseId}/{unitId}")
    public ResponseEntity<Course> saveLecture(
            @RequestBody Lecture lecture,
            @PathVariable int courseId,
            @PathVariable int unitId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addLectureToUnit(lecture, unitId, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    @PostMapping("/lectures/addMultiple/{courseId}/{unitId}")
    public ResponseEntity<Course> saveMultipleLecturesToUnit(
            @RequestBody List<Lecture> lectures,
            @PathVariable int courseId,
            @PathVariable int unitId,
            Authentication connectedUser) {
        Course updatedCourse = unitService.addMultipleLecturesToUnit(lectures, unitId, courseId, connectedUser);
        return ResponseEntity.ok(updatedCourse);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Course>> getCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/getByUserId")
    public ResponseEntity<List<Course>> getCoursesByLoggedInUserId(Authentication currentUser) {
        User user = (User) currentUser.getPrincipal();
        List<Course> courses = courseService.getCoursesByUserId(user.getId());
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/getByUserId/{id}")
    public ResponseEntity<List<Course>> getCoursesByUserId(@PathVariable int id) {
        List<Course> courses = courseService.getCoursesByUserId(id);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/getCourseCount")
    public ResponseEntity<Integer> getCourseCount() {
        Integer count = courseService.getCourseCount();
        return ResponseEntity.ok(count);
    }

    @PutMapping("/register")
    public ResponseEntity<Course> registerUserToCourse(
            @RequestBody CourseRegister courseRegister,
            Authentication authentication) {
        Course updatedCourse = courseService.registerUserToCourse(courseRegister, (UserDetails) authentication.getPrincipal());
        return ResponseEntity.ok(updatedCourse);
    }

    @PostMapping("/is-registered")
    public ResponseEntity<RegistrationStatusResponse> isUserRegistered(
            @RequestBody CourseRegister courseRegister,
            Authentication authentication) {
        boolean isRegistered = courseService.isUserRegisteredForCourse(courseRegister, (UserDetails) authentication.getPrincipal());
        RegistrationStatusResponse response = RegistrationStatusResponse.builder().isRegistered(isRegistered).build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateCourseApproval")
    public ResponseEntity<Map<String, String>> updateCourseStatus(@RequestBody Course course) {
        courseService.updateCourseStatus(course);
        Map<String, String> map = new HashMap<>();
        map.put("Message", "Success");
        return ResponseEntity.ok(map);
    }
}
