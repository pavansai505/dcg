import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  headers:any
  constructor(private http:HttpClient,private token:TokenService) {
    
   }
   
  getMyDetails=():Observable<User>=>{
    return this.http.get<User>(environment.apiBaseUrl+"user/getMyDetails",{
      headers:{
        'Authorization':'Bearer '+this.token.getToken()
      }
    })
 }
  getUserById=(id:number):Observable<any>=>{
    return this.http.get<any>(environment.apiBaseUrl+"user/getById/"+id,{
      headers:{
        'Authorization':'Bearer '+this.token.getToken()
      }
    })
 }
  getRegisteredCourses=():Observable<any>=>{
    return this.http.get<any>(environment.apiBaseUrl+"user/registered-courses")
 }
  emailSubscriptionToggle=():Observable<any>=>{
    return this.http.put<any>(environment.apiBaseUrl+"user/subscribe-to-email",{})
 }

}
