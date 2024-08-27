import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { CourseDataService } from '../../../services/course/course-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../../models/course/course';
import { PaymentService } from '../../../services/course/payment.service';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-course-info',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.css',
})
export class CourseInfoComponent {
  course!: Course;
  isCourseRegistered: boolean = false;
  isBrowser: boolean = false;

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
        this.course.units.sort((a, b) => a.id - b.id);
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

  enrollCourse() {
    this.courseService
      .registerToCourse({ courseId: this.course.id })
      .subscribe({
        next: (data) => (this.isCourseRegistered = true),
      });
  }
}
