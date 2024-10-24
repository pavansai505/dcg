package com.dcg.mvc.payment;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.coupon.Coupon;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "payment")
public class Payment extends BaseEntity {




    @Column(nullable = false,unique = true)
    private String paymentId; // Payment ID from Razorpay

    @Column(nullable = false)
    private String orderId; // Order ID associated with this payment

    @Column(nullable = false)
    private double amount; // Payment amount

    @Column(nullable = false)
    private String status; // Payment status (e.g., "success", "failed")

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // User associated with the payment

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course; // Course being purchased

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id", nullable = true) // Allow the coupon_id column to be nullable in the database
    private Coupon coupon; // Coupon applied in the payment, if any




}
