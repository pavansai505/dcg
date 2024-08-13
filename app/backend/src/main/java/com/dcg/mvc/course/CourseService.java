package com.dcg.mvc.course;

import com.dcg.constants.CourseStatus;
import com.dcg.model.CourseRegister;
import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.lecture.LectureRepository;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;

    public Course addCourse(Course course, Authentication connectedUser){
        course.setCreatedBy(((User) connectedUser.getPrincipal()).getId());
        course.setApprovalStatus(CourseStatus.PENDING);
        return courseRepository.save(course);
    }
    public List<Course> addMultipleCourses(List<Course> courses, Authentication connectedUser){
        List<Course> courseList=new ArrayList<>();
        for(Course course:courses){
            course.setCreatedBy(((User) connectedUser.getPrincipal()).getId());
            course.setApprovalStatus(CourseStatus.PENDING);
            courseList.add(courseRepository.save(course));
        }
        return courseList;
    }





    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public Course getCourseById(int id) {
        return courseRepository.findById(id).orElse(
                Course.builder().title("No Course Found").build()
        );
    }

    public int getCourseCount(){
        return courseRepository.getCourseCount();
    }

    public List<Course> getCoursesByUserId(int id){
        return courseRepository.findByCreatedBy(id);
    }

    public void updateCourseStatus(Course course){
        Course course1=courseRepository.findById(course.getId()).get();
        course1.setApprovalStatus(course.getApprovalStatus());
        courseRepository.save(course1);
    }

    @Transactional
    public Course registerUserToCourse(CourseRegister courseRegister, UserDetails principal) {
        int id=courseRegister.getCourseId();
        Course course=courseRepository.findById(id).orElse(null);
        User user=userRepository.findByEmail(principal.getUsername()).get();
        if(!user.getCourses().contains(course)){
            user.getRoles().size();
            user.addCourse(course);
            userRepository.save(user);
        }
        return course;
    }
    public boolean isUserRegisteredForCourse(CourseRegister courseRegister, UserDetails principal) {
        int id=courseRegister.getCourseId();
        Course course=courseRepository.findById(id).orElse(null);
        User user=userRepository.findByEmail(principal.getUsername()).get();
        return (user.getCourses().contains(course));
    }
}
