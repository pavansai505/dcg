package com.dcg.mvc.coupon;

import com.dcg.exception.*;
import com.dcg.mvc.payment.Payment;
import com.dcg.mvc.payment.PaymentMapper;
import com.dcg.mvc.payment.PaymentRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final PaymentMapper paymentMapper;



    // Create a new coupon
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    // Read a coupon by ID
    public Optional<Coupon> getCouponById(Long id) {
        return couponRepository.findById(id);
    }

    // Update an existing coupon
    public Coupon updateCoupon(Long id, Coupon couponDetails) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));

        coupon.setCode(couponDetails.getCode());
        coupon.setPercentage(couponDetails.getPercentage());
        coupon.setTotalUses(couponDetails.getTotalUses());
        coupon.setExpiryDate(couponDetails.getExpiryDate());
        coupon.setActive(couponDetails.isActive()); // Assuming there is an active field

        return couponRepository.save(coupon);
    }

    // Delete a coupon
    public void deleteCoupon(Long id) {
        couponRepository.deleteById(id);
    }

    // Check if the coupon is valid
    public CouponResponse checkCouponValidity(String code) {
        Optional<Coupon> optionalCoupon = couponRepository.findByCode(code);

        if (optionalCoupon.isPresent()) {
            Coupon coupon = optionalCoupon.get();
            if (coupon.isValid()) {
                return new CouponResponse(true, coupon.getPercentage(), "Coupon is valid.");
            } else {
                return new CouponResponse(false, 0, "Coupon is either expired or has reached its maximum usage limit.");
            }
        } else {
            return new CouponResponse(false, 0, "Coupon code is invalid.");
        }
    }

    // Find all coupons
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    // Find a coupon by code
    public Optional<Coupon> findCouponByCode(String code) {
        return couponRepository.findByCode(code);
    }

    // Activate or deactivate a coupon
    public Coupon toggleCouponActiveStatus(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));

        coupon.setActive(!coupon.isActive()); // Toggle active status
        return couponRepository.save(coupon);
    }

    // Increment usage count (when a coupon is used)
    @Transactional
    public void useCoupon(ApplyCouponRequest applyCouponRequest, String username) {
        // Fetch coupon, user, and payment
        Coupon coupon = couponRepository.findByCode(applyCouponRequest.getCouponCode())
                .orElseThrow(() -> new CouponNotFoundException("Coupon not found"));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new CustomUserExceptions.UserNotFoundException("User not found"));

        Payment payment = paymentRepository.findById(applyCouponRequest.getPaymentId())
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found"));

        // Validate coupon
        validateCoupon(coupon, user);

        // Apply coupon to payment
        applyCouponToPayment(coupon, payment, user);

        // Save changes
        couponRepository.save(coupon);
        paymentRepository.save(payment);
        userRepository.save(user);
    }

    private void validateCoupon(Coupon coupon, User user) {
        if (!coupon.isValid()) {
            throw new InvalidCouponException("Coupon is not valid");
        }
        if (coupon.getTotalUses() <= 0) {
            throw new CouponUsageLimitReachedException("Coupon usage limit reached");
        }
        if (user.getCouponsUsed().contains(coupon)) {
            throw new CouponAlreadyUsedException("User has already used this coupon");
        }
    }

    private void applyCouponToPayment(Coupon coupon, Payment payment, User user) {
        coupon.decrementUses();
        payment.setCoupon(coupon);
        user.getCouponsUsed().add(coupon);
        coupon.getUsers().add(user);
        coupon.getPayments().add(payment);

        // Calculate discount using BigDecimal for precision
        BigDecimal discount = BigDecimal.valueOf(payment.getAmount())
                .multiply(BigDecimal.valueOf(coupon.getPercentage()))
                .divide(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal newAmount = BigDecimal.valueOf(payment.getAmount()).subtract(discount);
        payment.setAmount(newAmount.doubleValue()); // Convert back to double for storage
    }
    // Get all valid coupons
    public List<Coupon> getValidCoupons() {
        return couponRepository.findAll().stream()
                .filter(Coupon::isValid)
                .collect(Collectors.toList());
    }

    // Get coupons used by a specific user
    public Set<Coupon> getCouponsByUser(User user) {
        return user.getCouponsUsed();
    }

    @Transactional
    public CouponResponse useCoupon(String code){
        Optional<Coupon> coupon = couponRepository.findByCode(code);
                if(!coupon.isPresent()){
                    return CouponResponse.builder().message("Invalid coupon code.").isValid(false).build();
                }
        Coupon coupon1=coupon.get();
        if(coupon1.isValid()){

            coupon1.decrementUses();
            couponRepository.save(coupon1);
            return CouponResponse.builder().message("Coupon success").isValid(true).build();
        }else{
            return CouponResponse.builder().message("Coupon invalid").isValid(false).build();
        }
    }
}
