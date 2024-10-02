package com.dcg.mvc.coupon;

import com.dcg.response.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/coupon")
public class CouponController {

    private final CouponService couponService;

    @Autowired
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    // Create a new coupon
    @PostMapping
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return new ResponseEntity<>(createdCoupon, HttpStatus.CREATED);
    }

    // Get all coupons
    @GetMapping
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        List<Coupon> coupons = couponService.getAllCoupons();
        return ResponseEntity.ok(coupons);
    }

    // Get a coupon by ID
    @GetMapping("/{id}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable Long id) {
        Optional<Coupon> coupon = couponService.getCouponById(id);
        return coupon.map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a coupon
    @PutMapping("/{id}")
    public ResponseEntity<Coupon> updateCoupon(@PathVariable Long id, @RequestBody Coupon couponDetails) {
        try {
            Coupon updatedCoupon = couponService.updateCoupon(id, couponDetails);
            return ResponseEntity.ok(updatedCoupon);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a coupon
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        try {
            couponService.deleteCoupon(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Check coupon validity
    @GetMapping("/check/{code}")
    public ResponseEntity<CouponResponse> checkCouponValidity(@PathVariable String code) {
        CouponResponse response = couponService.checkCouponValidity(code);
        return ResponseEntity.ok(response);
    }

    // Find a coupon by code
    @GetMapping("/code/{code}")
    public ResponseEntity<Coupon> findCouponByCode(@PathVariable String code) {
        Optional<Coupon> coupon = couponService.findCouponByCode(code);
        return coupon.map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Toggle coupon active status
    @PatchMapping("/{id}/toggle-active")
    public ResponseEntity<Coupon> toggleCouponActiveStatus(@PathVariable Long id) {
        try {
            Coupon updatedCoupon = couponService.toggleCouponActiveStatus(id);
            return ResponseEntity.ok(updatedCoupon);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get all valid coupons
    @GetMapping("/valid")
    public ResponseEntity<List<Coupon>> getValidCoupons() {
        List<Coupon> validCoupons = couponService.getValidCoupons();
        return ResponseEntity.ok(validCoupons);
    }
    @PostMapping("/apply")
    public ResponseEntity<CustomResponse> applyCoupon(@RequestBody ApplyCouponRequest applyCouponRequest, Authentication authentication) {

    couponService.useCoupon(applyCouponRequest, authentication.getName());
    return ResponseEntity.ok(CustomResponse.builder().message("Coupon applied.").build());
    }
}
