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
  selector: 'app-instructor-delete-units',
  standalone: true,
  imports: [ ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TruncateStringSizePipe,],
  templateUrl: './instructor-delete-units.component.html',
  styleUrl: './instructor-delete-units.component.css'
})
export class InstructorDeleteUnitsComponent {
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

  toggleContestStatus(id:number) {
    const unit = this.selectedCourse?.units.find((unit) => unit.id === id);
  
    if (unit) {
      unit.disabled=!unit.disabled
      this.courseService.toggleUnitStatus(id).subscribe({
        next: (data) => {
          console.log("Sucess");
          this.toast.showToast("Unit disabled",'info')
        },
        error: (error) => {
          unit.disabled=!unit.disabled
          this.toast.showToast("Error",'danger')
        }
      });
    }
  }
  
}
