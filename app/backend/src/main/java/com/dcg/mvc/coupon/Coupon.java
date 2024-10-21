package com.dcg.mvc.coupon;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.payment.Payment;
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "coupon")
public class Coupon extends BaseEntity {


    @Column(nullable = false, unique = true)
    private String code; // Unique coupon code

    @Column(nullable = false)
    private double percentage; // Discount percentage

    @Column(nullable = false)
    private int totalUses; // Total uses of this coupon

    @Column(nullable = false)
    private LocalDateTime expiryDate; // Expiry date for the coupon

    @ManyToMany(mappedBy = "couponsUsed")
    private Set<User> users; // Users who have used this coupon

    @OneToMany(mappedBy = "coupon")
    @JsonIgnore
    private List<Payment> payments; // Payments where this coupon was applied

    private boolean active;

    public boolean isValid() {
        return totalUses > 0 && expiryDate.isAfter(LocalDateTime.now());
    }

    public void decrementUses() {
        if (totalUses > 0) {
            totalUses--;
        }
    }
}
