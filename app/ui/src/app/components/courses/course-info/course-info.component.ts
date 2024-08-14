import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { CourseDataService } from '../../../services/course/course-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../../models/course/course';
import { PaymentService } from '../../../services/course/payment.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-course-info',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule,RouterLink],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.css',
})
export class CourseInfoComponent {
  course!: Course;
  isCourseRegistered: boolean = false;
  isBrowser: boolean=false;

  constructor(
    private courseService: CourseDataService,
    private activatedRouter: ActivatedRoute,
    private paymentService: PaymentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit() {
    const id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe({
      next: (value) => {
        this.course = value;
        this.course.units.sort((a,b)=>a.id-b.id)
        this.courseService
          .isCourseRegistered({ courseId: this.course.id })
          .subscribe({
            next: (data) => {
              this.isCourseRegistered = data.registered;
            },
          });
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('LGTM!'),
    });
  }

  paymentId!: string;
  error!: string;
  form!: any;

  options = {
    key: '',
    amount: '',
    name: 'Coding World',
    description: 'Web Development',
    image:
      'https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png',
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };

  onSubmit(): void {
    this.paymentId = '';
    this.error = '';
    this.paymentService.createOrder(this.form).subscribe({
      next: (data) => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = this.course.title;
        this.options.prefill.email = data.email;

        if (data.pgName === 'razor2') {
          this.options.image = '';
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
          var rzp2 = new Razorpay(this.options);
          rzp2.open();
        }

        rzp1.on('payment.failed', (response: any) => {
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        });
      },
      error: (err) => {
        this.error = err.error.message;
      },
      complete: () => console.log('all ok'),
    });
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.paymentService.verifyOrder(event).subscribe({
      next: (value) => console.log('not good'),

      error: (err) => console.log('error'),

      complete: () => console.log('finr'),
    });
  }

  enrollCourse() {
    this.courseService
      .registerToCourse({ courseId: this.course.id })
      .subscribe({
        next:(data)=>this.isCourseRegistered=true
      });
  }
}
