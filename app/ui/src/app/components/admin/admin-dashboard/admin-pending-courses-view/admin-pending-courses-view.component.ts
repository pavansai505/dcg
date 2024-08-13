import { Component } from '@angular/core';
import { Course } from '../../../../models/course/course';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { Router } from '@angular/router';
import { CourseCardComponent } from '../../../utilities/course-card/course-card.component';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { CommonModule } from '@angular/common';
import { CourseCardApprovalCardsComponent } from '../../../utilities/course-card-approval-cards/course-card-approval-cards.component';

@Component({
  selector: 'app-admin-pending-courses-view',
  standalone: true,
  imports: [CourseCardApprovalCardsComponent,TruncateStringSizePipe,CommonModule],
  templateUrl: './admin-pending-courses-view.component.html',
  styleUrl: './admin-pending-courses-view.component.css'
})
export class AdminPendingCoursesViewComponent {
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
        this.courses=value.filter((ele:Course)=>ele.approvalStatus=="pending")
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

  modifyCourseData(){
    this.getCourses()
    
  }
}
