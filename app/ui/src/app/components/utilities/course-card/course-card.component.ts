import { Component, Input } from '@angular/core';
import { Course } from '../../../models/course/course';
import { RouterLink } from '@angular/router';
import { TruncateStringSizePipe } from '../../../pipes/truncate-string-size.pipe';
import { CourseDataService } from '../../../services/course/course-data.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink,TruncateStringSizePipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!:Course
  courseLecturesCount:number=0
  constructor(private courseService:CourseDataService){}
  ngOnInit(){
  }

}
