import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDataService } from '../../../services/course/course-data.service';
import { Course } from '../../../models/course/course';
import { PaymentService } from '../../../services/payment/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../../services/coupon/coupon.service';
import { CouponResponse } from '../../../models/coupon/coupon';

@Component({
  selector: 'app-course-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-payment.component.html',
  styleUrl: './course-payment.component.css',
})
export class CoursePaymentComponent {
  courseCode!: string | null;
  course!: Course;
  couponCode: string = '';
  couponError: string = '';
  discountPercentage: number = 0;
  discountPrice: number = 0;
  isDiscountApplied: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseDataService,
    private paymentService: PaymentService,
    private couponService: CouponService
  ) {}

  ngOnInit(): void {
    // Access the route parameters using snapshot
    this.courseCode = this.route.snapshot.paramMap.get('courseCode');
    if (this.courseCode) {
      this.courseService.getCourseByCourseCode(this.courseCode).subscribe({
        next: (data) => {
          this.course = data;
        },
      });
    }
  }
  applyCoupon() {
    if (!this.couponCode) {
      this.couponError = 'Coupon code cannot be empty!'; // Set error message
      this.resetDiscount();
    } else {
      // Logic to apply the coupon
      this.couponError = ''; // Clear error if coupon is valid
      this.couponService.isCouponValid(this.couponCode).subscribe({
        next: (response) => {
          console.log(response);

          if (response.valid) {
            // Apply the coupon
            this.discountPercentage = response.discount || 0;
            this.couponError = ''; // Clear any previous error
            // Additional logic for applying the coupon
            this.setDiscount();
          } else {
            this.couponError = response.message; // Display the error message
          }
        },
        error: (err) => {
          console.error('Error checking coupon:', err);
          this.couponError = 'An error occurred while validating the coupon.';
        },
        complete: () => {
          console.log('Coupon validation process completed.');
        },
      });
    }
  }

  setDiscount() {
    this.isDiscountApplied = true;
    this.discountPrice = parseFloat(
      (
        this.course.price -
        (this.course.price * this.discountPercentage) / 100
      ).toFixed(2)
    );
  }
  resetDiscount() {
    this.isDiscountApplied = false;
    this.discountPrice = 0;
    this.couponCode = '';
  }

  initiatePayment() {
    const amount = this.isDiscountApplied
      ? this.discountPrice
      : this.course.price;
    console.log(amount);
    if (!this.isDiscountApplied) {
      this.paymentService.createOrder(amount).subscribe((order: any) => {
        if (this.courseCode) {
          this.paymentService.initiatePayment(
            order.id,
            amount,
            this.courseCode,
            this.couponCode
          );
        }
      });
    } else {
      this.couponService.useCoupon(this.couponCode).subscribe({
        next: (response) => {
          console.log(response);

          if (response.valid) {
            // Apply the coupon
            this.paymentService.createOrder(amount).subscribe((order: any) => {
              if (this.courseCode) {
                this.paymentService.initiatePayment(
                  order.id,
                  amount,
                  this.courseCode,
                  this.couponCode
                );
              }
            });
          } else {
            this.couponError = response.message; // Display the error message
          }
        },
        error: (err) => {
          console.error('Error checking coupon:', err);
          this.couponError = 'An error occurred while validating the coupon.';
        },
        complete: () => {
          console.log('Coupon validation process completed.');
        },
      });
    }
  }
}
