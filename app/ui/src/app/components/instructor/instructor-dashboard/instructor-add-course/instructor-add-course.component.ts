import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseDataService } from '../../../../services/course/course-data.service';

@Component({
  selector: 'app-instructor-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './instructor-add-course.component.html',
  styleUrl: './instructor-add-course.component.css',
})
export class InstructorAddCourseComponent {
  courseForm!: FormGroup;
  courseUploaded:boolean=false
  constructor(private courseService: CourseDataService) {
    this.courseForm = new FormGroup({
      title: new FormControl('', Validators.required),
      synopsis: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price:new FormControl(0,Validators.required)
    });
  }
  onSubmit(form: FormGroup) {
    this.courseService.addCourse(form.value).subscribe({
      next: (value) => {
        this.courseUploaded=true
        
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
}
