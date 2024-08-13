import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { CourseCardComponent } from '../../../utilities/course-card/course-card.component';
import { Course } from '../../../../models/course/course';
import { CourseDataService } from '../../../../services/course/course-data.service';

@Component({
  selector: 'app-instructor-my-courses',
  standalone: true,
  imports: [CommonModule,RouterLink,TruncateStringSizePipe,CourseCardComponent],
  templateUrl: './instructor-my-courses.component.html',
  styleUrl: './instructor-my-courses.component.css'
})
export class InstructorMyCoursesComponent {
  courses: Course[] = [];
  constructor(
    private router: Router,
    private courseService: CourseDataService
  ) {}
  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => (this.courses = value),
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
}
