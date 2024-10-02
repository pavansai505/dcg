package com.dcg.mvc.coupon;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplyCouponRequest {

    @NotBlank(message = "Coupon code cannot be empty")
    private String couponCode;

    private Long paymentId;
}
