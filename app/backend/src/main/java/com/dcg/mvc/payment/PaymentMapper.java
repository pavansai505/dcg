package com.dcg.mvc.payment;

import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserMapper;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    @Autowired
    private UserRepository userRepository;

    // Converts Payment entity to PaymentDTO
    public PaymentDTO toDTO(Payment payment) {
        if (payment == null) {
            return null;
        }

        // Fetch the user based on the createdBy field in the Course
        User user = userRepository.findById(payment.getCourse().getCreatedBy())
                .orElse(User.builder().email("Unknown").build()); // Provide a default username
        String author = user.getEmail(); // Get the author's username

        return new PaymentDTO(
                payment.getPaymentId(),
                payment.getOrderId(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getUser().getId(),
                payment.getUser().getUsername(),
                payment.getCourse() != null ? payment.getCourse().getId() : null,
                payment.getCourse() != null ? payment.getCourse().getTitle() : null,
                author,
                payment.getCoupon() != null ? payment.getCoupon().getId() : null,
                payment.getCoupon()!= null ? payment.getCoupon().getCode() : null,
                payment.getCoupon()!= null ?(int)  payment.getCoupon().getPercentage() : 0
        );
    }
}
