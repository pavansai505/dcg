package com.dcg.mvc.payment;

import com.dcg.mvc.course.CourseDTO;
import com.dcg.mvc.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    private String paymentId; // Payment ID from Razorpay
    private String orderId; // Order ID associated with this payment
    private double amount; // Payment amount
    private String status; // Payment status (e.g., "success", "failed")
    private Long userId;
    private String userName;
    private Long courseId; // ID of the course being purchased
    private String courseTitle;
    private String courseAuthor;
    private Long couponId; // ID of the coupon applied in the payment, if any
    private String couponName;
    private int percentage;
}
