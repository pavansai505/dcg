import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { Course } from '../../models/course/course';
import CourseApproval from '../../models/course/courseApproval';
import CourseRegister from '../../models/course/courseRegister';
import { Lecture } from '../../models/course/lecture';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  headers:any
  constructor(private http:HttpClient,private token:TokenService) {
    
   }
   getCourses=():Observable<any>=>{
      return this.http.get<any>(environment.apiBaseUrl+"course/get",{
        headers:{
          'Authorization':'Bearer '+this.token.getToken()
        }
      })
   }
   getCourseById=(id:number):Observable<any>=>{
      return this.http.get<any>(environment.apiBaseUrl+"course/get/"+id,{
        headers:{
          'Authorization':'Bearer '+this.token.getToken()
        }
      })
   }
   getCoursesByUserId=(id:number):Observable<any>=>{
      return this.http.get<any>(environment.apiBaseUrl+"course/getByUserId/"+id,{
        headers:{
          'Authorization':'Bearer '+this.token.getToken()
        }
      })
   }
   getCourseByLoggedInUserId=():Observable<any>=>{
      return this.http.get<any>(environment.apiBaseUrl+"course/getByUserId",{
        headers:{
          'Authorization':'Bearer '+this.token.getToken()
        }
      })
   }
   addCourse=(course:Course):Observable<any>=>{
      return this.http.post<any>(environment.apiBaseUrl+"course/add",course,{
        headers:{
          'Authorization':'Bearer '+this.token.getToken()
        }
      })
   }
   addLectures=(lecture:Lecture,id:number):Observable<any>=>{
      return this.http.post<any>(environment.apiBaseUrl+"course/lecture/add/"+id,lecture,{
        headers:{
          'Authorization':'Bearer '+this.token.getToken()
        }
      })
   }
   updateCourseApproval=(approvalStatus:CourseApproval):Observable<any>=>{
      return this.http.put<any>(environment.apiBaseUrl+"course/updateCourseApproval",approvalStatus)
   }

   registerToCourse=(data:CourseRegister):Observable<any>=>{
      return this.http.put<any>(environment.apiBaseUrl+"course/register",data)
   }
   isCourseRegistered=(data:CourseRegister):Observable<any>=>{
      return this.http.post<any>(environment.apiBaseUrl+"course/is-registered",data)
   }

   getTotalLectures(course: Course): number {
    return course.units.reduce((total, unit) => total + unit.lectures.length, 0);
  }

}
