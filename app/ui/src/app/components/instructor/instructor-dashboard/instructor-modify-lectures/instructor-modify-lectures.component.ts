import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { environment } from '../../../../../environments/environment';
import { Course } from '../../../../models/course/course';
import { Unit } from '../../../../models/course/unit';
import { Lecture } from '../../../../models/course/lecture';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';

@Component({
  selector: 'app-instructor-modify-lectures',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TruncateStringSizePipe],
  templateUrl: './instructor-modify-lectures.component.html',
  styleUrls: ['./instructor-modify-lectures.component.css'] // Corrected to styleUrls
})
export class InstructorModifyLecturesComponent implements OnInit {
  showForm: boolean = false;
  showLectureDropDown: boolean = false;
  selectedCourse: Course | null = null;
  selectedUnit: Unit | null = null;
  selectedLecture: Lecture | null = null;
  courses: Course[] = [];
  lectureForm: FormGroup;
  showLectureForm:boolean=false
  imagePageUrl = environment.apiBaseUrl;

  constructor(
    private courseService: CourseDataService,
    private toast: ToastService,
    private fb: FormBuilder
  ) {
    this.lectureForm = this.fb.group({
      lessonTitle: ['', Validators.required], // Matches lecture model
      lessonNotes: ['', Validators.required], // Matches lecture model
      lessonVideo: ['', Validators.required], // Matches lecture model
      code: ['', Validators.required] // Added code field
    });
  }

  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => (this.courses = value),
      error: (err) => console.error('Observable emitted an error: ' + err),
    });
  }

  showFormForCard(course: Course): void {
    this.selectedCourse = course;
    this.showForm = true;
    this.lectureForm.reset(); // Reset the form
  }

  setUnit(event: any) {
    const id = event.target.value;
    this.selectedUnit = this.selectedCourse?.units.find((ele) => ele.id == id) || null;
    this.selectedLecture = null; // Reset selected lecture
    this.lectureForm.reset(); // Clear the form
    this.showLectureDropDown=true
    console.log(this.selectedUnit);
    
  }

  setLecture(event: any) {
    const id = event.target.value;
    this.selectedLecture = this.selectedUnit?.lectures.find((ele) => ele.id == id) || null;

    // Patch the lecture form with the selected lecture values
    if (this.selectedLecture) {
      this.lectureForm.patchValue({
        lessonTitle: this.selectedLecture.lessonTitle,
        lessonNotes: this.selectedLecture.lessonNotes, // Ensure this matches your Lecture model
        lessonVideo: this.selectedLecture.lessonVideo,
        code: this.selectedLecture.code // Patch the code field
      });
    }
    this.showLectureForm=true
  }

  onSubmit() {
    if (this.selectedCourse && this.selectedUnit && this.selectedLecture) {
      this.courseService.updateLecture(this.selectedLecture.id, this.lectureForm.value)
        .subscribe({
          next: () => {
            this.toast.showToast("Lecture modified successfully!");
            this.lectureForm.reset(); // Reset the form after submission
          },
          error: (err) => console.error('Observable emitted an error: ' + err),
        });
    } else {
      this.toast.showToast("Please select a course, unit, and lecture.");
    
  }
}
}
