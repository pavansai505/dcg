import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ToastService } from '../../../../../services/toast/toast.service';
import { TokenService } from '../../../../../services/token/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessControlService } from '../../../../../services/auth/access-control.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-google-singin',
  standalone: true,
  imports: [],
  templateUrl: './google-singin.component.html',
  styleUrl: './google-singin.component.css'
})
export class GoogleSinginComponent { 
  redirectURL: any;
  constructor(private auth:AuthService,private toast:ToastService,private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private accessControl: AccessControlService){
    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL'];
    }
  }
  // ngOnInit(): void {
  //   // Expose the handleClick method to the global window object for Google One Tap to call
  //   window['handleClick'] = this.handleClick.bind(this);
  // }
  ngOnInit() {
    // Check if google API is loaded
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignin();
    } else {
      // Retry when the API might not have loaded yet
      const checkGoogleLoad = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(checkGoogleLoad);
          this.initializeGoogleSignin();
        }
      }, 100); // Retry every 100ms
    }
  }

  initializeGoogleSignin() {
    google.accounts.id.initialize({
      client_id: environment.googleClient,
      callback: this.handleClick.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      {
        theme: "filled_blue",
        size: "large",
        width: "100%",
        shape: "pill",
        text: "signin_with",
      }
    );
  }
  handleClick(response: any) {

    const credential = response.credential;

    this.auth.signInWithGoogle({ idToken: credential }).subscribe({
      next: (value) => {
        this.tokenService.setToken('jwt', value.token);
        this.tokenService.setToken('username', value.username);
        this.tokenService.setToken('refreshToken', value.refreshToken);
        this.accessControl.refreshAccessControl();
    },
      error: (err) => this.toast.showToast('User not found.','danger'),
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
