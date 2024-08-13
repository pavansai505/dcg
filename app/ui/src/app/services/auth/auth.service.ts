import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../../models/auth/userCredentials';
import { UserRegistration } from '../../models/auth/userRegistration';
import { Observable } from 'rxjs';
import ForgotPassword from '../../models/auth/forgotPasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http:HttpClient) { }
  signIn=(data:UserCredentials):Observable<any>=>{
    return this.http.post<any>("http://localhost:8080/api/v1/user/auth/login",data);
  }
  register=(data:UserRegistration):Observable<any>=>{
    return this.http.post<any>("http://localhost:8080/api/v1/user/auth/register",data);
  }
  forgotPassword=(data:ForgotPassword):Observable<any>=>{
    return this.http.post<any>("http://localhost:8080/api/v1/user/auth/forgot-password",data);
  }
  resetPassword(token: string, password: any) {
    return this.http.post<any>("http://localhost:8080/api/v1/user/auth/reset-password",{token:token,password:password});
  }

}
