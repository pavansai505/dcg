import { Inject, inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { error } from 'console';
import { CourseDataService } from '../course/course-data.service';
import CourseRegister from '../../models/course/courseRegister';
import { Router } from '@angular/router';
import { CouponService } from '../coupon/coupon.service';
import { Observable } from 'rxjs';
import { PaymentDTO } from '../../models/payment/payment';
// Ensure your environment files contain your API base URL and Razorpay key ID.

declare var Razorpay: any;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private http: HttpClient,
    private courseService: CourseDataService,
    private router: Router,
    private zone: NgZone,
    private couponService: CouponService
  ) {}
  coupon: string = '';
  // Method to create an order in the backend
  createOrder(amount: number) {
    return this.http.post(`${environment.apiBaseUrl}payment/createOrder`, {
      amount,
    });
  }

  // Method to initiate the Razorpay payment process
  initiatePayment(
    orderId: string,
    amount: number,
    courseCode: string,
    coupon: string,
    userDetails:any
  ) {
    if (coupon.length>0) {
      this.coupon = coupon;
    }
  
    
    // const totalAmount = parseFloat((amount * 100).toFixed(2)); 
    // alert(totalAmount)
    const options = {
      key: environment.razorpayKeyId, // Replace with your Razorpay Key ID
      amount: amount, // Amount in the smallest currency unit (paise for INR)
      currency: 'INR',
      name: 'DCG',
      description: 'Payment for Order #' + orderId,
      order_id: orderId, // This order ID comes from your backend
      handler: (response: any) => {
        console.log(response);
        this.verifyPayment(response, courseCode);
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.mobile,
      },
      theme: {
        color: '#F37254', // Set a theme color for the Razorpay popup
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  // Method to verify the payment on the backend
  verifyPayment(paymentResponse: any, courseCode: string) {
    paymentResponse['courseCode'] = courseCode;
    this.http
      .post(`${environment.apiBaseUrl}payment/verifyPayment`, paymentResponse)
      .subscribe({
        next: (data) => {
          console.log(data, this.coupon);
          if(this.coupon){
            this.couponService.applyCoupon(this.coupon, data).subscribe({
              next: (response) => {
                // Handle successful coupon application
                console.log('Coupon applied successfully:', response);
                // You can update the UI or state to reflect the discount
              },
              error: (err) => {
                // Handle errors, such as invalid coupon or server issues
                console.error('Error applying coupon:', err);
                // Optionally, show an error message to the user
              },
              complete: () => {
                console.log('Coupon application process completed.');
              },
            });
          }

          this.courseService
            .registerToCourse({ courseCode: courseCode } as CourseRegister)
            .subscribe({
              next: (data1) => {
                this.zone.run(() => {
                  this.router.navigate(['courses/course/info/' + data1.id]);
                });
              },
              error: (error) => {
                console.log(error);
              },
            });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }


  getAllPayments(): Observable<PaymentDTO[]> { // Ensure this returns an array
    return this.http.get<PaymentDTO[]>(`${environment.apiBaseUrl}payment/all`);
  }



}
