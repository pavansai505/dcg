package com.dcg.service;


import com.dcg.constants.CourseStatus;
import com.dcg.model.CourseRegister;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseRepository;
import com.dcg.mvc.course.CourseService;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class CourseServiceTest {

    @InjectMocks
    private CourseService courseService;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private Authentication authentication;

    @Mock
    private UserDetails userDetails;

    public CourseServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddCourse() {
        User user = new User();
        user.setId(1L);
        when(authentication.getPrincipal()).thenReturn(user);
        Course course = new Course();
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        Course result = courseService.addCourse(course, authentication);

        assertNotNull(result);
        assertEquals(CourseStatus.PENDING, result.getApprovalStatus());
        assertEquals(user.getId(), result.getCreatedBy());
        verify(courseRepository, times(1)).save(course);
    }

    @Test
    void testAddMultipleCourses() {
        User user = new User();
        user.setId(1L);
        when(authentication.getPrincipal()).thenReturn(user);
        List<Course> courses = new ArrayList<>();
        Course course1 = new Course();
        Course course2 = new Course();
        courses.add(course1);
        courses.add(course2);
        when(courseRepository.save(any(Course.class))).thenReturn(course1).thenReturn(course2);

        List<Course> result = courseService.addMultipleCourses(courses, authentication);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(CourseStatus.PENDING, result.get(0).getApprovalStatus());
        assertEquals(CourseStatus.PENDING, result.get(1).getApprovalStatus());
        assertEquals(user.getId(), result.get(0).getCreatedBy());
        assertEquals(user.getId(), result.get(1).getCreatedBy());
        verify(courseRepository, times(2)).save(any(Course.class));
    }

    @Test
    void testGetAllCourses() {
        List<Course> courses = new ArrayList<>();
        courses.add(new Course());
        when(courseRepository.findAll()).thenReturn(courses);

        List<Course> result = courseService.getAllCourses();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(courseRepository, times(1)).findAll();
    }

    @Test
    void testGetCourseById() {
        Course course = new Course();
        when(courseRepository.findById(anyLong())).thenReturn(Optional.of(course));

        Course result = courseService.getCourseById(1L);

        assertNotNull(result);
        verify(courseRepository, times(1)).findById(anyLong());
    }

    @Test
    void testGetCourseCount() {
        when(courseRepository.getCourseCount()).thenReturn(10L);

        Long result = courseService.getCourseCount();

        assertEquals(10L, result);
        verify(courseRepository, times(1)).getCourseCount();
    }

    @Test
    void testGetCoursesByUserId() {
        List<Course> courses = new ArrayList<>();
        when(courseRepository.findByCreatedBy(anyLong())).thenReturn(courses);

        List<Course> result = courseService.getCoursesByUserId(1L);

        assertNotNull(result);
        assertEquals(courses, result);
        verify(courseRepository, times(1)).findByCreatedBy(anyLong());
    }

    @Test
    void testUpdateCourseStatus() {
        Course course = new Course();
        course.setId(1L);
        course.setApprovalStatus(CourseStatus.APPROVED);
        when(courseRepository.findById(anyLong())).thenReturn(Optional.of(course));
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        courseService.updateCourseStatus(course);

        assertEquals(CourseStatus.APPROVED, course.getApprovalStatus());
        verify(courseRepository, times(1)).findById(anyLong());
        verify(courseRepository, times(1)).save(any(Course.class));
    }

    @Test
    void testRegisterUserToCourse() {
        Course course = new Course();
        course.setId(1L);
        User user = new User();
        user.setEmail("user@example.com");
        when(userDetails.getUsername()).thenReturn("user@example.com");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(courseRepository.findById(anyLong())).thenReturn(Optional.of(course));

        CourseRegister courseRegister = new CourseRegister();
        courseRegister.setCourseId(1L);
        Course result = courseService.registerUserToCourse(courseRegister, userDetails);

        assertNotNull(result);
        assertTrue(user.getCourses().contains(course));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testIsUserRegisteredForCourse() {
        Course course = new Course();
        course.setId(1L);
        User user = new User();
        user.setEmail("user@example.com");
        user.addCourse(course);
        when(userDetails.getUsername()).thenReturn("user@example.com");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(courseRepository.findById(anyLong())).thenReturn(Optional.of(course));

        CourseRegister courseRegister = new CourseRegister();
        courseRegister.setCourseId(1L);
        boolean result = courseService.isUserRegisteredForCourse(courseRegister, userDetails);

        assertTrue(result);
        verify(userRepository, times(1)).findByEmail(anyString());
        verify(courseRepository, times(1)).findById(anyLong());
    }
}
