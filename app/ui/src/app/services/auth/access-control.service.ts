import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  result: any;
  roles: any;
  isUser:boolean=false
  isAdmin:boolean=false
  isInstructor:boolean=false
  constructor() {
    const token = window.sessionStorage.getItem('jwt') || '';
    if (token != '') {
      this.result = jwtDecode(token);
      this.roles = this.result.authorities.map((ele: any) => {
        return Object.values(ele)[0];
      });
      this.isUserLoggedIn()
      this.isAdminLoggedIn()
      this.isInstructorLoggedIn()
    } else {
      this.result = false;
    }
    
    
  }
  isUserLoggedIn() {
    this.isUser= this.result.authorities.length > 0;
    return this.isUser
  }
  isAdminLoggedIn() {
    this.isAdmin= this.roles.includes("ROLE_ADMIN");
    return this.isAdmin
  }
  isInstructorLoggedIn() {
    this.isInstructor= this.roles.includes("ROLE_INSTRUCTOR");
    return this.isInstructor
  }
}
