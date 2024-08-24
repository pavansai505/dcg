import { Component } from '@angular/core';
import { Course } from '../../../../models/course/course';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { CommonModule } from '@angular/common';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { Toast } from 'bootstrap';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-instructor-add-units',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TruncateStringSizePipe,
  ],
  templateUrl: './instructor-add-units.component.html',
  styleUrl: './instructor-add-units.component.css',
})
export class InstructorAddUnitsComponent {
  showForm: boolean = false;
  selectedCourse: Course | null = null;
  unitForm: FormGroup;
  courses: any;
  constructor(
    private courseService: CourseDataService,
    private fb: FormBuilder,
    private toast:ToastService
  ) {
    this.unitForm = this.fb.group({
      units: this.fb.array([
        this.fb.group({
          unitTitle: ['', Validators.required],
        }),
      ]),
    });
  }
  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => (this.courses = value),
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
    
  }
  // makeAToast() {
  //   // Make sure Bootstrap is included in your project
    
  //   const toastLiveExample = document.getElementById('liveToast');

  //   if (toastLiveExample) {
  //     const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
  //       toastBootstrap.show();
  //   }
  // }
  showFormForCard(course: Course): void {
    this.selectedCourse = course;
    this.showForm = true;
  }

  get units(): FormArray {
    return this.unitForm.get('units') as FormArray;
  }

  addUnit() {
    this.units.push(
      this.fb.group({
        unitTitle: ['', Validators.required],
      })
    );
  }

  removeUnit(index: number) {
    this.units.removeAt(index);
  }

  onSubmit() {
    if (this.selectedCourse != null) {
      this.courseService
        .addUnits(this.unitForm.value.units, this.selectedCourse.id)
        .subscribe({
          next: (value) => {
            this.toast.showToast("Unit added succesfully")
          },
          error: (err) => console.error('Observable emitted an error: ' + err),
          complete: () => {this.resetForm();},
        });
    }
  }
  
  private resetForm() {
    this.unitForm.reset({
      units: [
        this.fb.group({
          unitTitle: ['', Validators.required],
        }),
      ],
    });
  }
}
