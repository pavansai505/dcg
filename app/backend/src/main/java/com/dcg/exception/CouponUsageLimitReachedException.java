package com.dcg.exception;

public class CouponUsageLimitReachedException extends RuntimeException {
    public CouponUsageLimitReachedException(String message) {
        super(message);
    }
}
