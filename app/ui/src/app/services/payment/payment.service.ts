import { Inject, inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { error } from 'console';
import { CourseDataService } from '../course/course-data.service';
import CourseRegister from '../../models/course/courseRegister';
import { Router } from '@angular/router';
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
    private zone: NgZone
  ) {}

  // Method to create an order in the backend
  createOrder(amount: number) {
    return this.http.post(`${environment.apiBaseUrl}payment/createOrder`, {
      amount,
    });
  }

  // Method to initiate the Razorpay payment process
  initiatePayment(orderId: string, amount: number, courseCode: string) {
    const options = {
      key: environment.razorpayKeyId, // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in the smallest currency unit (paise for INR)
      currency: 'INR',
      name: 'Your App Name',
      description: 'Payment for Order #' + orderId,
      order_id: orderId, // This order ID comes from your backend
      handler: (response: any) => {
        console.log(response);
        this.verifyPayment(response, courseCode);
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+919876543210',
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
    paymentResponse['courseCode']=courseCode
    this.http
      .post(`${environment.apiBaseUrl}payment/verifyPayment`, paymentResponse)
      .subscribe({
        next: (data) => {
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
}
