import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsService } from '../../../../services/user/user-details.service';

@Component({
  selector: 'app-admin-add-users',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-add-users.component.html',
  styleUrls: ['./admin-add-users.component.css']
})
export class AdminAddUsersComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,private userService:UserDetailsService) {
    this.signUpForm = this.fb.group({
      users: this.fb.array([]) // Initialize users as a FormArray
    });
  }

  ngOnInit(): void {
    this.addUser(); // Add the first user form by default
  }

  get users(): FormArray {
    return this.signUpForm.get('users') as FormArray; // Getter for users FormArray
  }

  createUser(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  addUser(): void {
    this.users.push(this.createUser()); // Add a new user form group to the FormArray
  }

  removeUser(index: number): void {
    if (this.users.length > 1) {
      this.users.removeAt(index); // Remove a user form group from the FormArray
    }
  }

  onSubmit(): void {
    this.userService.addUsers(this.signUpForm.value.users).subscribe({
      next: (response) => {
        console.log('Users added successfully', response);
        // Handle success (e.g., show a success message)
        this.resetForm(); // Call the method to reset the form
      },
      error: (err) => {
        console.error('Error adding users:', err);
        // Handle error (e.g., show an error message)
      }
    });
  }
  resetForm(): void {
    this.users.clear(); // Clear the current FormArray
    this.addUser(); // Add a new user form group to the FormArray
  }
}
