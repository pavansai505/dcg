import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../../../services/user/user-details.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/user/user';
import { ToastService } from '../../../../services/toast/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;

  constructor(
    private userService: UserDetailsService,
    private toast: ToastService,
    private fb: FormBuilder // Inject FormBuilder
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
      next: (val: User) => {
        console.log(val);
        this.user.subscribeToEmail = true;
        this.toast.showToast('Subscribed to mail.');
      },
      error: (err) => {
        console.log(err);
      },
    });
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
}
