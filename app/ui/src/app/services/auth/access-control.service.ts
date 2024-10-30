import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  private roles: string[] = [];
  public isLoggedin:boolean=false
  public isUser: boolean = false;
  public isAdmin: boolean = false;
  public isInstructor: boolean = false;

  constructor(private tokenService: TokenService) {
    this.updateAccessControl();
  }

  private updateAccessControl(): void {
    const token = this.tokenService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.roles = decodedToken.authorities.map((ele: any) => Object.values(ele)[0]);
        this.isUser = this.roles.length > 0;
        this.isAdmin = this.roles.includes('ROLE_ADMIN');
        this.isInstructor = this.roles.includes('ROLE_INSTRUCTOR');
        this.isLoggedin=true
      } catch (error) {
        console.error('Error decoding token:', error);
        this.clearAccessControl();
      }
    } else {
      this.clearAccessControl();
    }
  }

  private clearAccessControl(): void {
    this.roles = [];
    this.isUser = false;
    this.isAdmin = false;
    this.isInstructor = false;
    this.isLoggedin=false
  }

  // Optionally, you can expose methods to refresh the access control
  public refreshAccessControl(): void {
    window.location.reload()
    this.updateAccessControl();
  }
}
