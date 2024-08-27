import { Component } from '@angular/core';
import { Course } from '../../../../models/course/course';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';

@Component({
  selector: 'app-instructor-add-badge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,TruncateStringSizePipe],
  templateUrl: './instructor-add-badge.component.html',
  styleUrl: './instructor-add-badge.component.css',
})
export class InstructorAddBadgeComponent {
  showForm: boolean = false;
  selectedCourse: Course | null = null;
  badgeForm: FormGroup;
  courses: any;
  constructor(
    private courseService: CourseDataService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.badgeForm = this.fb.group({
      badgeName: ['', Validators.required],
      badgeDescription: ['', Validators.required],
      badgeIcon: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.courseService.getCourseByLoggedInUserId().subscribe({
      next: (value) => {this.courses = value;}
      ,
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {},
    });
  }
  showFormForCard(course: Course): void {
    this.selectedCourse = course;
    this.showForm = true;
  }

  get units(): any {
    return this.badgeForm.get('units') as any;
  }

  onSubmit() {
    const badge=this.badgeForm.value
    badge.courseId=this.selectedCourse?.id
    
    if (this.selectedCourse != null) {
      this.courseService
        .addBadge(badge)
        .subscribe({
          next: (value) => {
            this.toast.showToast('Badge added succesfully');
          },
          error: (err) => console.error('Observable emitted an error: ' + err),
          complete: () => {
            this.resetForm();
          },
        });
    }
  }

  private resetForm() {
    this.badgeForm.reset({
      badgeName: '',
      badgeDescription: '',
      badgeIcon:'',
    });
  }
}
