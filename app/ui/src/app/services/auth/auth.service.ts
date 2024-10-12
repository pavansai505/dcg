import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../../models/auth/userCredentials';
import { UserRegistration } from '../../models/auth/userRegistration';
import { Observable } from 'rxjs';
import ForgotPassword from '../../models/auth/forgotPasswordRequest';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http:HttpClient) { }
  signIn=(data:UserCredentials):Observable<any>=>{
    return this.http.post<any>(environment.apiBaseUrl+"user/auth/login",data);
  }
  register=(data:UserRegistration):Observable<any>=>{
    return this.http.post<any>(environment.apiBaseUrl+"user/auth/register",data);
  }
  forgotPassword=(data:ForgotPassword):Observable<any>=>{
    return this.http.post<any>(environment.apiBaseUrl+"user/auth/forgot-password",data);
  }
  resetPassword(token: string, password: any) {
    return this.http.post<any>(environment.apiBaseUrl+"user/auth/reset-password",{token:token,password:password});
  }

}
