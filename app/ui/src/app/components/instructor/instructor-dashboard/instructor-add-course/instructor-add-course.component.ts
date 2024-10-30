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
  imagePreview: string | ArrayBuffer | null = null; // To hold the image preview
  imageFile: File | null = null; // To hold the selected image file
  imageError: string | null = null; // To hold error messages for image validation

  constructor(private formBuilder: FormBuilder, private courseService: CourseDataService) {
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

  onSubmit(form: FormGroup) {
    const formValue = {
      ...form.value,
      tags: form.value.tags.split(',').map((tag: string) => tag.trim()),
      endGoals: form.value.endGoals.split(',').map((goal: string) => goal.trim()),
    };

    this.courseService.addCourse(formValue).subscribe({
      next: (course) => {
        this.uploadImage(course.id, this.imageFile); // Upload image with course ID
        this.courseUploaded = true;
      },
      error: (err) => console.error('Error adding course: ' + err),
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
}
