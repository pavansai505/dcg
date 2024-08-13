import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService,private router:Router) {}
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onSubmit(form: FormGroup) {
    this.authService.register(form.value).subscribe({
      next: (value) =>{sessionStorage.setItem("jwt",value.token);sessionStorage.setItem("username",value.username)},
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () =>this.router.navigate(['/home']),
    });
  }
}
