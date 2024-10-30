import { Component, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../utilities/navbar/navbar.component';
import { FooterComponent } from '../../utilities/footer/footer.component';
import { CourseDataService } from '../../../services/course/course-data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Course } from '../../../models/course/course';
import { CommonModule, DatePipe } from '@angular/common';
import CourseRegister from '../../../models/course/courseRegister';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
  styleUrls: ['./course-info.component.css'], // Corrected from styleUrl to styleUrls
})
export class CourseInfoComponent implements OnDestroy {
  course!: Course;
  isCourseRegistered: boolean = false;
  imageUrl:string=environment.apiBaseUrl
  private routeSub!: Subscription; // To manage route subscription

  constructor(
    private courseService: CourseDataService,
    private activatedRouter: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    // Subscribe to route parameters to handle route changes
    this.routeSub = this.activatedRouter.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadCourse(id); // Load course data whenever route changes
    });
  }

  private loadCourse(id: number) {
    this.courseService.getCourseById(id).subscribe({
      next: (value) => {
        console.log('Course Data:', value); // Debugging step
        this.course = value;
        this.course.units.sort((a, b) => a.id - b.id);
        this.checkRegistrationStatus(); // Check if the user is registered for this course
      },
      error: (err) => {
        console.error('Error fetching course data:', err); // Improved error handling
      }
    });
  }

  private checkRegistrationStatus() {
    this.courseService.isCourseRegistered({ courseId: this.course.id } as CourseRegister)
      .subscribe({
        next: (data) => {
          this.isCourseRegistered = data.registered;
          console.log('Registration Status:', this.isCourseRegistered); // Debugging step
        },
        error: (err) => {
          console.error('Error checking registration status:', err); // Improved error handling
        }
      });
  }
  enrollCourse() {
    if(this.course.price==0){
      this.courseService
      .registerToCourse({ courseCode: this.course.courseCode } as CourseRegister)
      .subscribe({
        next: (data) => (this.isCourseRegistered = true),
      });
    }else{
        this.router.navigate(['/courses/course/'+this.course.courseCode+'/payment'])
    }
    
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
