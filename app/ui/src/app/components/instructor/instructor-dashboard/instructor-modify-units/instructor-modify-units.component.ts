import { Component } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Toast } from 'bootstrap';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { Course } from '../../../../models/course/course';
import { environment } from '../../../../../environments/environment';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { log } from 'console';
import { Unit } from '../../../../models/course/unit';
@Component({
  selector: 'app-instructor-modify-units',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TruncateStringSizePipe,
  ],
  templateUrl: './instructor-modify-units.component.html',
  styleUrl: './instructor-modify-units.component.css',
})
export class InstructorModifyUnitsComponent {
  showForm: boolean = false;
  selectedCourse: Course | null = null;
  courses: any;
  imagePageUrl = environment.apiBaseUrl;
  unitsUpdated:boolean=false
  constructor(
    private courseService: CourseDataService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {}
  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => {
        this.courses = value;
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
  showFormForCard(course: Course): void {
    this.selectedCourse = course;
    this.showForm = true;
  }

  onSubmit() {
    const units = this.selectedCourse?.units;
  
    if (units) {
      this.courseService.updateUnits(units).subscribe({
        next: (updatedUnits) => {
          console.log('Units updated successfully:', updatedUnits);
          this.selectedCourse!.units=updatedUnits
          // Optionally, show a success message
          this.unitsUpdated=true
        },
        error: (error) => {
          console.error('Error updating units:', error);
          // Optionally, show an error message
        }
      });
    }
  }
  
}
