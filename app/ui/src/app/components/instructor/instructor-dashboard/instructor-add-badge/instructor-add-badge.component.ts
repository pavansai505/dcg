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
import { BadgeService } from '../../../../services/badge/badge.service';
import { environment } from '../../../../../environments/environment';
import { Badge } from '../../../../models/badge/badge';

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
  imagePreview: string | ArrayBuffer | null = null; // To hold the image preview
  imageFile: File | null = null; // To hold the selected image file
  imageError: string | null = null; // To hold error messages for image validation
  imageUrl:string=environment.apiBaseUrl
  constructor(
    private courseService: CourseDataService,
    private fb: FormBuilder,
    private toast: ToastService,
    private badgeService:BadgeService
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
          next: (value:Badge) => {
            this.uploadImage(value.id,this.imageFile)
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

  uploadImage(badgeId: number, file: File | null) {
    if (!file) return; // Ensure file is not null

    const formData = new FormData();
    formData.append('file', file);

    this.badgeService.uploadBadgeImage(badgeId, formData).subscribe({
      next: (response) => {
        this.imageFile=null
        this.imagePreview=null
        console.log('Image uploaded successfully', response);
      },
      error: (err) => console.error('Error uploading image: ' + err),
    });
  }

}
