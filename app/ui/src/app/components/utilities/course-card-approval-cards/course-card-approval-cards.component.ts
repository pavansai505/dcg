import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TruncateStringSizePipe } from '../../../pipes/truncate-string-size.pipe';
import { Course } from '../../../models/course/course';
import { CommonModule } from '@angular/common';
import { CourseDataService } from '../../../services/course/course-data.service';
import CourseApproval from '../../../models/course/courseApproval';

@Component({
  selector: 'app-course-card-approval-cards',
  standalone: true,
  imports: [RouterLink,TruncateStringSizePipe,CommonModule],
  templateUrl: './course-card-approval-cards.component.html',
  styleUrl: './course-card-approval-cards.component.css'
})
export class CourseCardApprovalCardsComponent {
  @Input() course!:Course
  @Output() updateCourses=new EventEmitter<null>();
  constructor(private courseService:CourseDataService){}
  changeStatus(id:number,type:string){
    this.courseService.updateCourseApproval({id:id,approvalStatus:type} as CourseApproval).subscribe({
      next:(data)=>this.updateCourses.emit()
    })
  }
}
