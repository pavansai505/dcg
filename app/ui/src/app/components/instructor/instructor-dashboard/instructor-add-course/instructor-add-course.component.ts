import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CourseDataService } from '../../../../services/course/course-data.service';

@Component({
  selector: 'app-instructor-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './instructor-add-course.component.html',
  styleUrls: ['./instructor-add-course.component.css'],
})
export class InstructorAddCourseComponent {
  courseForm: FormGroup;
  courseUploaded: boolean = false;

  constructor(private formBuilder: FormBuilder, private courseService: CourseDataService) {
    // Create the form using FormBuilder
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      synopsis: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      tags: ['', Validators.required], // Keep as string input
      endGoals: ['', Validators.required], // Keep as string input
      courseLevel: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    // Convert comma-separated strings to arrays
    const formValue = {
      ...form.value,
      tags: form.value.tags.split(',').map((tag: string) => tag.trim()), // Convert to array
      endGoals: form.value.endGoals.split(',').map((goal: string) => goal.trim()), // Convert to array
    };

    this.courseService.addCourse(formValue).subscribe({
      next: (value) => {
        this.courseUploaded = true;
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
}
