import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../../services/coupon/coupon.service';
import { Coupon } from '../../../../models/coupon/coupon';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-coupon-list',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './admin-coupon-list.component.html',
  styleUrls: ['./admin-coupon-list.component.css']
})
export class AdminCouponListComponent implements OnInit {
  coupons: Coupon[] = []; // Array to hold the coupons

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.getCoupons(); // Fetch coupons when the component initializes
  }

  getCoupons(): void {
    this.couponService.getCoupons().subscribe({
      next: (coupons) => {
        this.coupons = coupons;
      },
      error: (error) => {
        console.error('Error fetching coupons:', error);
      }
    });
  }

  toggleCoupon(couponId: number = 0, isActive: boolean): void {
    console.log(`Coupon ID: ${couponId}, Active: ${isActive}`);
    if (couponId > 0) {
      this.couponService.toggleCoupon(couponId).subscribe({
        next: (response) => {
          console.log('Coupon status updated:', response);
          // Optionally refresh the coupon list or update the local state
        },
        error: (error) => {
          console.error('Error updating coupon status:', error);
        }
      });
    }
  }
}
