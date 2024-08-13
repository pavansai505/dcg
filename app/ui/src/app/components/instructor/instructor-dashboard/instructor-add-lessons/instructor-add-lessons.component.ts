import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { Course } from '../../../../models/course/course';

@Component({
  selector: 'app-instructor-add-lessons',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TruncateStringSizePipe],
  templateUrl: './instructor-add-lessons.component.html',
  styleUrl: './instructor-add-lessons.component.css',
})
export class InstructorAddLessonsComponent {
  showForm: boolean = false;
  selectedCourse: Course | null = null;
  lessonFormGroup: FormGroup;
  courses: any;
  constructor(private courseService: CourseDataService) {
    this.lessonFormGroup = new FormGroup({
      unitId: new FormControl(),
      unitTitle: new FormControl('', Validators.required),
      lessonId: new FormControl(),
      lessonTitle: new FormControl('', Validators.required),
      lessonActivityName: new FormControl('', Validators.required),
      lessonNotes: new FormControl('', Validators.required),
      lessonVideo: new FormControl('', Validators.required),
      lessonObjectives: new FormControl('', Validators.required),
      enable: new FormControl(true, Validators.required),
    });
  }
  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => (this.courses = value),
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
  showFormForCard(course: Course): void {
    this.selectedCourse = course;
    this.showForm = true;
  }
  onSubmit(form: FormGroup) {
    if (this.selectedCourse != null) {
      this.courseService
        .addLectures(form.value, this.selectedCourse.id)
        .subscribe({
          next: (value) => {
            console.log(value);
          },
          error: (err) => console.error('Observable emitted an error: ' + err),
          complete: () => {},
        });
    }
  }
}
