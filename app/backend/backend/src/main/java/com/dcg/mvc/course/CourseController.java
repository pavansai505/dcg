package com.dcg.mvc.course;

import com.dcg.model.CourseRegister;
import com.dcg.model.RegistrationStatusResponse;
import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.user.User;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
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

    @PostMapping("/add")
    public ResponseEntity<Course> saveCourse(@RequestBody Course course, Authentication connectedUser){
        return ResponseEntity.ok().body(courseService.addCourse(course,connectedUser));
    }
    @PostMapping("/addMultiple")
    public ResponseEntity<List<Course>> saveCourses(@RequestBody List<Course> course, Authentication connectedUser){
        return ResponseEntity.ok().body(courseService.addMultipleCourses(course,connectedUser));
    }
    @PostMapping("/lecture/add/{courseId}")
    public ResponseEntity<Course> saveLecture(@RequestBody Lecture lecture, @PathVariable int courseId, Authentication connectedUser){
        return ResponseEntity.ok().body(courseService.addLecture(lecture,courseId,connectedUser));

    }
    @PostMapping("/lecture/addMultiple/{courseId}")
    public ResponseEntity<Course> saveLectures(@RequestBody List<Lecture> lecture, @PathVariable int courseId, Authentication connectedUser){
        return ResponseEntity.ok().body(courseService.addMultipleLecture(lecture,courseId,connectedUser));

    }

    @GetMapping("/get")
    public ResponseEntity<List<Course>> getCourses(){
        return ResponseEntity.ok().body(courseService.getAllCourses());
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id){
        return ResponseEntity.ok().body(courseService.getCourseById(id));
    }
    @GetMapping("/getByUserId")
    public ResponseEntity<List<Course>> getCoursesByLoggedInUserId(Authentication currentUser){
        User user= (User) currentUser.getPrincipal();
        return ResponseEntity.ok().body(courseService.getCoursesByUserId(user.getId()));
    }
    @GetMapping("/getByUserId/{id}")
    public ResponseEntity<List<Course>> getCoursesByUserId(@PathVariable int id){
        return ResponseEntity.ok().body(courseService.getCoursesByUserId(id));
    }
    @GetMapping("/getCourseCount")
    public ResponseEntity<Integer> getCourseCount(){
        return ResponseEntity.ok().body(courseService.getCourseCount());
    }

    @PutMapping("/register")
    public ResponseEntity<Course> registerUserToCourse(@RequestBody CourseRegister courseRegister,Authentication authentication){
        return ResponseEntity.ok().body(courseService.registerUserToCourse(courseRegister,(UserDetails) authentication.getPrincipal()));
        //System.out.println((UserDetails)authentication.getPrincipal());
        //return null;
    }
    @PostMapping("/is-registered")
    public ResponseEntity<RegistrationStatusResponse> isUserRegistered(@RequestBody CourseRegister courseRegister, Authentication authentication) {
        return ResponseEntity.ok().body(
                RegistrationStatusResponse.builder().isRegistered(courseService.isUserRegisteredForCourse(courseRegister,(UserDetails) authentication.getPrincipal())).build()
        );
    }


    @PutMapping("/updateCourseApproval")
    public ResponseEntity<Map<String,String>> updateCourseStatus(@RequestBody Course course){
        courseService.updateCourseStatus(course);
        Map<String,String> map=new HashMap<String,String>();
        map.put("Message","Success");
        return ResponseEntity.ok().body(map);
    }

}
