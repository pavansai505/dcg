import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  headers:any
  constructor(private http:HttpClient,private token:TokenService) {
    
   }
   
  getMyDetails=():Observable<any>=>{
    return this.http.get<any>("http://localhost:8080/api/v1/user/getMyDetails",{
      headers:{
        'Authorization':'Bearer '+this.token.getToken()
      }
    })
 }
  getRegisteredCourses=():Observable<any>=>{
    return this.http.get<any>("http://localhost:8080/api/v1/user/registered-courses")
 }
}
