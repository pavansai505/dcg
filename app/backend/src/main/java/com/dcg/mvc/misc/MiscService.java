package com.dcg.mvc.misc;

import com.dcg.model.AdminDashboardStats;
import com.dcg.mvc.course.CourseRepository;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MiscService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseRepository courseRepository;

    public AdminDashboardStats getAdminDashboardStats(){
        return AdminDashboardStats.builder()
                .userCount(Long.valueOf(userRepository.findAll().size()))
                .courseCount(Long.valueOf(courseRepository.findAll().size()))
                .registrationsCount(0L)
                .salesCount(0L).build();
    }
}
