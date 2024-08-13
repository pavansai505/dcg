import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  userError: boolean = false;
  loading: boolean = false;
  submitStatus: boolean = false;

  constructor(private authService: AuthService) {}
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  onSubmit(form: FormGroup) {
    this.loading = true;
    this.authService
      .forgotPassword({ email: form.value.email })
      .pipe(
        finalize(() => (this.loading = false)),
        catchError((err) => {
          this.loading=false
          this.userError = true;
          
          return of(null); // Return an observable to complete the pipeline
        })
      )
      .subscribe({
        next: (value: any) => {
          if(value!=null) this.submitStatus=true
        }
      });
  }
}
