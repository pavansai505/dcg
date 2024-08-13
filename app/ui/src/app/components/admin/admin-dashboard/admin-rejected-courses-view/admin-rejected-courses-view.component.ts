import { Component } from '@angular/core';
import { Course } from '../../../../models/course/course';
import { Router } from '@angular/router';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../../utilities/course-card/course-card.component';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { CourseCardApprovalCardsComponent } from '../../../utilities/course-card-approval-cards/course-card-approval-cards.component';

@Component({
  selector: 'app-admin-rejected-courses-view',
  standalone: true,
  imports: [CommonModule,CourseCardApprovalCardsComponent,TruncateStringSizePipe],
  templateUrl: './admin-rejected-courses-view.component.html',
  styleUrl: './admin-rejected-courses-view.component.css'
})
export class AdminRejectedCoursesViewComponent {
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
        this.courses=value.filter((ele:Course)=>ele.approvalStatus=="rejected")
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }

  modifyCourseData(){
    this.getCourses()
    
  }

}
