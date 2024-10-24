import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { Course } from '../../models/course/course';
import CourseApproval from '../../models/course/courseApproval';
import CourseRegister from '../../models/course/courseRegister';
import { Lecture } from '../../models/course/lecture';
import { environment } from '../../../environments/environment';
import { Unit } from '../../models/course/unit';
import { CourseActionHistory } from '../../models/course/courseActionHistory';

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
   getCourseByCourseCode=(code:string):Observable<any>=>{
      return this.http.get<any>(environment.apiBaseUrl+"course/get/v2/"+code)
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
   addUnits=(units:Unit[],id:number):Observable<any>=>{
      return this.http.post<any>(environment.apiBaseUrl+"course/units/addMultiple/"+id,units)
   }
   addLectures=(lecture:Lecture[],courseId:number,lectureId:number):Observable<any>=>{
      return this.http.post<any>(environment.apiBaseUrl+"course/lectures/addMultiple/"+courseId+"/"+lectureId,lecture)
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

   isLectureViewed(lectureId:number): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl+'lecture-progress/is-viewed/'+lectureId);
  }
   markLectureViewed(lectureId:number): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl+'lecture-progress/mark-viewed/'+lectureId,{});
  }
   addBadge(badge:any): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl+'badges',badge);
  }


   getCourseHistory(id:number): Observable<CourseActionHistory> {
    return this.http.get<CourseActionHistory>(environment.apiBaseUrl+'course/courseActionHistory/'+id);
  }
   getCourseHistoryByCode(code:string): Observable<CourseActionHistory> {
    return this.http.get<CourseActionHistory>(environment.apiBaseUrl+'course/courseActionHistory/'+code+'/code');
  }
   awardCourseBadge(id:number): Observable<CourseActionHistory> {
    return this.http.post<CourseActionHistory>(environment.apiBaseUrl+'badges/award/course/'+id,{});
  }
   setCourseHistory(id:number,percentageCompleted:string): Observable<any> {
    console.log({
      "courseId":id,
      "percentage":Number(percentageCompleted.split("%")[0])
    });
    return this.http.put<any>(environment.apiBaseUrl+'course/updateCourseHistory/completionPercentage',{
      "courseId":id,
      "percentage":Number(percentageCompleted.split("%")[0])
    });
   
    
  }
  

}
