package com.dcg.mvc.payment;

import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private PaymentMapper paymentMapper;


    public List<PaymentDTO> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
                .map(paymentMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Other methods...
}
