import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDataService } from '../../../services/course/course-data.service';
import { Course } from '../../../models/course/course';
import { PaymentService } from '../../../services/payment/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../../services/coupon/coupon.service';
import { log } from 'console';

@Component({
  selector: 'app-course-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-payment.component.html',
  styleUrls: ['./course-payment.component.css'],
})
export class CoursePaymentComponent {
  courseCode!: string | null;
  course!: Course;
  couponCode: string = '';
  couponError: string = '';
  discountPercentage: number = 0;
  discountPrice: number = 0;
  isDiscountApplied: boolean = false;

  // User details
  userName: string = '';
  userEmail: string = '';
  userMobile: string = '';

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
      this.couponError = 'Coupon code cannot be empty!';
      this.resetDiscount();
      console.log("-----");
      
    } else {
      this.couponError = '';
      this.couponService.isCouponValid(this.couponCode).subscribe({
        next: (response) => {
          if (response.valid) {
            this.discountPercentage = response.discount || 0;
            this.setDiscount();
          } else {
            this.couponError = response.message;
          }
        },
        error: (err) => {
          console.error('Error checking coupon:', err);
          this.couponError = 'An error occurred while validating the coupon.';
        },
      });
    }
  }

  setDiscount() {
    // Validate discountPercentage before applying it
    if (this.discountPercentage < 0 || this.discountPercentage > 100) {
      console.error('Discount percentage must be between 0 and 100.');
      return;
    }
  
    // Calculate the discount amount and the new price
    const discountAmount = (this.course.price * this.discountPercentage) / 100;
    const newPrice = this.course.price - discountAmount;
  
    // Ensure the new price is not negative
    if (newPrice < 0) {
      console.error('Discounted price cannot be negative.');
      return;
    }
  
    this.isDiscountApplied = true;
    this.discountPrice = parseFloat(newPrice.toFixed(2)); // Using toFixed for two decimal places
  }
  

  resetDiscount() {
    this.isDiscountApplied = false;
    this.discountPrice = 0;
    this.couponCode = '';
  }

  initiatePayment() {
    if (!this.userName || !this.userEmail || !this.userMobile) {
      this.couponError = 'Please fill in all user details.';
      return;
    }

    const amount = this.isDiscountApplied ? this.discountPrice : this.course.price;

    this.paymentService.createOrder(amount).subscribe({
      next: (order: any) => {
        const userDetails = {
          name: this.userName,
          email: this.userEmail,
          mobile: this.userMobile,
        };
        if (this.courseCode) {
          this.paymentService.initiatePayment(
            order.id,
            amount,
            this.courseCode,
            this.isDiscountApplied?this.couponCode:"",
            userDetails
          );
        }
      },
      error: (err) => {
        console.error('Error creating payment order:', err);
        this.couponError = 'An error occurred while initiating the payment.';
      },
    });
  }
}
