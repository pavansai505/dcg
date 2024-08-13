import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-admin-signin',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './admin-signin.component.html',
  styleUrl: './admin-signin.component.css'
})
export class AdminSigninComponent {
  redirectURL:any
  constructor(private authService:AuthService,private router:Router,private tokenService:TokenService,private route:ActivatedRoute){
    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
        this.redirectURL = params['redirectURL'];
    }
  }

  signInForm=new FormGroup({
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
  })
  onSubmit(form:FormGroup) {
    
    this.authService.signIn(form.value).subscribe({
      next: (value) =>{this.tokenService.setToken("jwt",value.token);this.tokenService.setToken("username",value.username)},
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () =>{
        if(this.redirectURL){
          this.router.navigate([this.redirectURL.slice(1)])
        }else{
          this.router.navigate(['/home'])
        }
      },
    });
    
    }

}
