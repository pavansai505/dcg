import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { AuthService } from '../../../../services/auth/auth.service';
import { catchError, finalize, of } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  token: string = '';
  isLoading:boolean=false
  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  constructor(private activatedRoute: ActivatedRoute,private authService:AuthService,private router:Router) {}
  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParams['token'];
  }
  onSubmit(){
    this.authService.resetPassword(this.token,this.resetPasswordForm.value.password).pipe(
      finalize(() => this.isLoading = false),
      catchError(err => {
        console.log(err)
        
        return of(null);
      })
    )
    .subscribe((response:any)=>{
      console.log(response);
      this.router.navigate(['/auth/user/signin'])
    });
    
  }
}
