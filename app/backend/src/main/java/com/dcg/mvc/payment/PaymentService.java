package com.dcg.mvc.payment;

import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public void savePayment(Payment payment, Long userId, Long courseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        payment.setUser(user);
        payment.setCourse(course);
        paymentRepository.save(payment);

        // Update user to include this payment
        user.addPayment(payment);
        userRepository.save(user);

        // Update course to include this payment
        course.addPayment(payment);
        courseRepository.save(course);
    }

    // Other methods...
}
