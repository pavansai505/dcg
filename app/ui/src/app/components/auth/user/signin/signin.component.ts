import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { TokenService } from '../../../../services/token/token.service';
import { AccessControlService } from '../../../../services/auth/access-control.service';
import { GoogleSinginComponent } from "../social/google-singin/google-singin.component";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, GoogleSinginComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  redirectURL: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private accessControl: AccessControlService
  ) {
    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL'];
    }
  }
  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onSubmit(form: FormGroup) {
    this.authService.signIn(form.value).subscribe({
      next: (value) => {
        this.tokenService.setToken('jwt', value.token);
        this.tokenService.setToken('username', value.username);
        this.tokenService.setToken('refreshToken', value.refreshToken);
        this.tokenService.setToken('imageUrl', value.imageUrl);
        this.accessControl.refreshAccessControl();
    },
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => {
        if (this.redirectURL) {
          console.log("here","/"+this.redirectURL.slice(1));
          this.router.navigate([this.redirectURL.slice(1)]);
        } else {
          console.log("here");
          this.router.navigate(['/courses/home']);
        }
      },
    });
  }
}
