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
import { AccessControlService } from '../../../../services/auth/access-control.service';
import { TokenService } from '../../../../services/token/token.service';
import { GoogleSingupComponent } from "../social/google-singup/google-singup.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, GoogleSingupComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router, private accessControl: AccessControlService,private tokenService:TokenService) {}
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onSubmit(form: FormGroup) {
    const formData = {
      ...form.value,
      email: form.value.email.toLowerCase(), // Convert email to lowercase
    };
    
    this.authService.register(formData).subscribe({
      next: (value) => {
        this.tokenService.setToken('jwt', value.token);
        this.tokenService.setToken('username', value.username);
        this.tokenService.setToken('refreshToken', value.refreshToken);
        this.tokenService.setToken('imageUrl', value.imageUrl);
        this.accessControl.refreshAccessControl();
      },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => this.router.navigate(['/home']),
    });
  }
}
