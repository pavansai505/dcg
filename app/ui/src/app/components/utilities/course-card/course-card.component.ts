import { Component, Input } from '@angular/core';
import { Course } from '../../../models/course/course';
import { RouterLink } from '@angular/router';
import { TruncateStringSizePipe } from '../../../pipes/truncate-string-size.pipe';
import { CourseDataService } from '../../../services/course/course-data.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink,TruncateStringSizePipe,CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!:Course
  @Input() priceShow:boolean=true
  @Input() progressShow:boolean=false
  coursePercentage:number=0
  imagePageUrl=environment.apiBaseUrl
  courseLecturesCount:number=0
  constructor(private courseService:CourseDataService){}
  ngOnInit(){
    if(this.progressShow){
      this.courseService.getCourseHistory(this.course.id).subscribe({
        next:(data)=>{this.coursePercentage=data.percentageCompleted},
        error:(err)=>console.log(err),
        complete:()=>{
        }
      })
    }
    
  }

}
