package com.dcg.mvc.misc;

import com.dcg.model.AdminDashboardStats;
import com.dcg.mvc.course.CourseRepository;
import com.dcg.mvc.payment.PaymentRepository;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
public class MiscService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    PaymentRepository paymentRepository;

    public AdminDashboardStats getAdminDashboardStats(){
        return AdminDashboardStats.builder()
                .userCount((long) userRepository.findAll().size())
                .courseCount((long) courseRepository.findAll().size())
                .registrationsCount((long) paymentRepository.findAll().size())
                .salesCount((long) paymentRepository.findAll().size()).build();
    }
}
