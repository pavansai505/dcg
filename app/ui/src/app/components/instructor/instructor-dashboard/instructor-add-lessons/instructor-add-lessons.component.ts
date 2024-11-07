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
import { ToastService } from '../../../../services/toast/toast.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-instructor-add-lessons',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TruncateStringSizePipe],
  templateUrl: './instructor-add-lessons.component.html',
  styleUrl: './instructor-add-lessons.component.css',
})
export class InstructorAddLessonsComponent {
  showForm: boolean = false;
  showLectureForm: boolean = false;
  selectedCourse: Course | null = null;
  selectedUnit: number | null = null;
  lessonFormGroup: FormGroup;
  courses: any;
  imagePageUrl = environment.apiBaseUrl;
imageUrl: any;
  constructor(private courseService: CourseDataService,private toast:ToastService) {
    this.lessonFormGroup = new FormGroup({
      lessonId: new FormControl(0, Validators.required),
      lessonTitle: new FormControl('', Validators.required),
      lessonNotes: new FormControl('', Validators.required),
      lessonVideo: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
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
    this.showLectureForm=false
  }
  setUnit(e: any) {
    this.selectedUnit = e.target.value;
    this.showLectureForm=true
  }
  onSubmit(form: FormGroup) {
    console.log(this.selectedUnit);
    console.log(form.value);
    
    
    if (this.selectedCourse && this.selectedUnit) {
      this.courseService
        .addLectures([form.value], this.selectedCourse.id,this.selectedUnit)
        .subscribe({
          next: (value) => {
            this.toast.showToast("Lecture added succesfully!")
            this.lessonFormGroup.reset({
              enable: true // Set default value for enable field if needed
            });
          },
          error: (err) => console.error('Observable emitted an error: ' + err),
          complete: () => {},
        });
    }
  }

  
}
