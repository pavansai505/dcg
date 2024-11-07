import { Component } from '@angular/core';
import { Course } from '../../../../models/course/course';
import { Router, RouterLink } from '@angular/router';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { CommonModule } from '@angular/common';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { CourseCardComponent } from '../../../utilities/course-card/course-card.component';
import { CourseCardApprovalCardsComponent } from '../../../utilities/course-card-approval-cards/course-card-approval-cards.component';
import { courseConstants } from '../../../../constants/CourseConstants';

@Component({
  selector: 'app-admin-courses-view',
  standalone: true,
  imports: [CommonModule,RouterLink,TruncateStringSizePipe,CourseCardApprovalCardsComponent],
  templateUrl: './admin-courses-view.component.html',
  styleUrl: './admin-courses-view.component.css',
})
export class AdminCoursesViewComponent {
  courses: Course[] = [];
  constructor(
    private router: Router,
    private courseService: CourseDataService
  ) {}
  ngOnInit() {
    this.getCourses()
  }
  getCourses(){
    this.courseService.getCourses().subscribe({
      next: (value) => {
        this.courses=value.filter((ele:Course)=>ele.approvalStatus==courseConstants.course_approved)
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

  modifyCourseData(){
    this.getCourses()
    
  }
}
