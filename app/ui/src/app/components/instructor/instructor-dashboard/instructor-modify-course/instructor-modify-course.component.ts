import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Course } from '../../../../models/course/course';
import { CourseDataService } from '../../../../services/course/course-data.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { TruncateStringSizePipe } from '../../../../pipes/truncate-string-size.pipe';
import { environment } from '../../../../../environments/environment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-instructor-modify-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TruncateStringSizePipe],
  templateUrl: './instructor-modify-course.component.html',
  styleUrls: ['./instructor-modify-course.component.css'],
})
export class InstructorModifyCourseComponent {
  showForm: boolean = false;
  selectedCourse: Course | null = null;
  courses!: Course[];
  imagePageUrl = environment.apiBaseUrl;
  courseForm: FormGroup;
  courseUploaded: boolean = false;
  imagePreview: string | ArrayBuffer | null = null; // To hold the image preview
  imageFile: File | null = null; // To hold the selected image file
  imageError: string | null = null; // To hold error messages for image validation
  deletingCourse!: Course | null;
  constructor(
    private courseService: CourseDataService,
    private formBuilder: FormBuilder,
    private toast: ToastService
  ) {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      synopsis: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      tags: ['', Validators.required],
      endGoals: ['', Validators.required],
      courseLevel: ['', Validators.required],
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

    // Populate the form with the selected course data
    this.courseForm.patchValue({
      title: course.title,
      authorName: course.authorName,
      synopsis: course.synopsis,
      description: course.description,
      price: course.price,
      tags: course.tags.join(', '), // Convert array to comma-separated string
      endGoals: course.endGoals.join(', '), // Convert array to comma-separated string
      courseLevel: course.courseLevel,
    });

    // Reset image fields
    this.imagePreview = null; // Reset preview
    this.imageFile = null; // Reset file
    this.imageError = null; // Reset error message
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Validate file size (max 5 MB)
      if (file.size > 5 * 1024 * 1024) {
        this.imageError = 'File size should be less than 5 MB.';
        this.imagePreview = null; // Clear the preview if there's an error
        this.imageFile = null; // Reset the image file
        return;
      }

      this.imageError = null; // Reset any error
      this.imageFile = file; // Store the file for later upload
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set image preview
      };
      reader.readAsDataURL(file);
    }
  }
  selectCourseToDelete(course: Course) {
    this.deletingCourse = course;
  }

  onSubmit(form: FormGroup) {
    const formValue = {
      ...form.value,
      tags: form.value.tags.split(',').map((tag: string) => tag.trim()),
      endGoals: form.value.endGoals
        .split(',')
        .map((goal: string) => goal.trim()),
    };

    this.courseService
      .updateCourse(this.selectedCourse?.id!, formValue)
      .subscribe({
        next: (course) => {
          if (this.imageFile) {
            this.uploadImage(course.id, this.imageFile); // Upload image with course ID
          }
          this.courseUploaded = true;
        },
        error: (err) => console.error('Error updating course: ' + err),
        complete: () => {},
      });
  }

  uploadImage(courseId: number, file: File | null) {
    if (!file) return; // Ensure file is not null

    const formData = new FormData();
    formData.append('file', file);

    this.courseService.uploadCourseImage(courseId, formData).subscribe({
      next: (response) => {
        console.log('Image uploaded successfully', response);
      },
      error: (err) => console.error('Error uploading image: ' + err),
    });
  }
  deleteCourse(): void {
    if(!this.deletingCourse){return }
    const courseId = this.deletingCourse.id;

    this.courseService
      .toggleCourseStatus(courseId)
      .pipe(
        finalize(() => {
          // This will run whether the request succeeds or fails
          document.getElementById('closeModal')?.click();
        })
      )
      .subscribe({
        next: () => {
          // Filter out the deleted course from the list
          const course = this.courses.find((course) => course.id === courseId);
          if (course) {
            course.disabled = !course.disabled;
          }

          this.toast.showToast('Course deleted successfully', 'success');
        },
        error: (err) => {
          console.error('Error deleting course: ' + err);
          this.toast.showToast('Failed to delete course', 'danger');
        },
      });
  }
}
