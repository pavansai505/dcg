package com.dcg.mvc.coupon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CouponResponse {
    private boolean isValid;     // Indicates if the coupon is valid
    private double discount;     // Discount percentage
    private String message;      // Reason message for the validation
}
