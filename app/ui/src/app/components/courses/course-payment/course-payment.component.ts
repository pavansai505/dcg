import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDataService } from '../../../services/course/course-data.service';
import { Course } from '../../../models/course/course';
import { PaymentService } from '../../../services/payment/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-payment.component.html',
  styleUrl: './course-payment.component.css',
})
export class CoursePaymentComponent {
  courseCode!: string | null;
  course!: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseDataService,
    private paymentService: PaymentService
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
  initiatePayment() {
    const amount = this.course.price;
    this.paymentService.createOrder(amount).subscribe((order: any) => {
      if (this.courseCode)
        this.paymentService.initiatePayment(order.id, amount, this.courseCode);
    });
  }
}
