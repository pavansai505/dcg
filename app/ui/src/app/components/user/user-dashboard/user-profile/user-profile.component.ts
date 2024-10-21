import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../../../services/user/user-details.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user/user';
import { ToastService } from '../../../../services/toast/toast.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TokenService } from '../../../../services/token/token.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;
  uploadForm!: FormGroup;
  selectedFile: File | null = null;
  fileSizeError: string | null = null;
  readonly MAX_SIZE_MB = 5; // Maximum file size in MB
  fileTypeError: string | null = null;
  readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg']; // Allowed image types
  imagePageUrl=environment.apiBaseUrl

  constructor(
    private userService: UserDetailsService,
    private toast: ToastService,
    private fb: FormBuilder,
    private token:TokenService
  ) {
    // Initialize the form in the ngOnInit lifecycle hook
  }

  ngOnInit(): void {
    this.initForm(); // Initialize form
    this.loadUserDetails(); // Load user details
  }

  private initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email validation
    });
    this.uploadForm = this.fb.group({
      file: [null], // Reactive form control for the file
    });
  }

  private loadUserDetails() {
    this.userService.getMyDetails().subscribe({
      next: (val) => {
        this.user = val;
        this.userForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
        });
      },
      error: (err) => {
        console.error('Error loading user details:', err);
      },
      complete: () => {},
    });
  }

  toggleSubscription() {
    this.userService.emailSubscriptionToggle().subscribe({
      next: () => {
        // Toggle the current status
        this.user.subscribeToEmail = !this.user.subscribeToEmail;

        if (this.user.subscribeToEmail) {
          this.toast.showToast('Subscribed to the newsletter.', 'success');
        } else {
          this.toast.showToast('Unsubscribed from the newsletter.', 'warning');
        }
      },
      error: (err) => {
        console.error('Error toggling subscription:', err);
        this.toast.showToast(
          'Failed to toggle subscription. Please try again later.',
          'danger'
        );
      },
    });
  }
  // Method to handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const fileSizeMB = file.size / (1024 * 1024); // Convert size to MB
        const fileType = file.type;

        // Validate file type
        if (!this.ALLOWED_TYPES.includes(fileType)) {
            this.fileTypeError = 'Invalid file type. Please upload an image file (JPEG, PNG, GIF).';
            this.selectedFile = null;
            this.fileSizeError = null; // Clear any previous file size errors
            return;
        } else {
            this.fileTypeError = null; // Clear file type error if valid
        }

        // Validate file size
        if (fileSizeMB > this.MAX_SIZE_MB) {
            this.fileSizeError = `File size should not exceed ${this.MAX_SIZE_MB} MB.`;
            this.selectedFile = null;
        } else {
            // Clear errors and set the selected file if size and type are valid
            this.fileSizeError = null;
            this.selectedFile = file;
            this.uploadForm.patchValue({
                file: this.selectedFile
            });
        }
    }
}

  // Method to submit the form
  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.userForm.value, // Spread the form values into the user object
      };

      // Call the user service to update user details
      this.userService.updateUser(updatedUser).subscribe({
        next: (val) => {
          this.user = val;
          this.toast.showToast('User details updated successfully.');
        },
        error: (err) => {
          console.error('Error updating user details:', err);
          this.toast.showToast('Error updating user details.');
        },
      });
    } else {
      this.toast.showToast('Please fill out the form correctly.'); // Show error if form is invalid
    }
  }
  // Method to handle form submission
  onImageSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }
  
   
    this.userService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        this.toast.showToast("Image uploaded succesfully.","success")
        // Update the user profile with the new image URL
        this.user.imageUrl = response.imageUrl; // Adjust based on your backend response
      },
      error: (error) => {
        console.error('Error uploading image:', error);
      },
      complete: () => {
        console.log('Image upload process completed.');
      }
    });
  }
  
}
