import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CourseDataService } from '../services/course/course-data.service';
import { catchError, of, switchMap } from 'rxjs';
import CourseRegister from '../models/course/courseRegister';

export const coursePurchaseAuthGuard: CanActivateFn = (route, state) => {
  const courseAccess = inject(CourseDataService);
  const router = inject(Router);
  
  
  // Extract course ID from the route parameters
  const courseCode = route.paramMap.get('courseCode');
  
  
  if (!courseCode) {
    // If no ID is present, deny access
    return of(false);
  }
  else{
    
    return courseAccess.isCourseRegistered({ "courseCode":courseCode } as CourseRegister).pipe(
      switchMap((data) => {
        // Return registration status
        if(data.registered){
          courseAccess.getCourseByCourseCode(courseCode).subscribe({
            next:((data)=>{
              router.navigate(['/courses/course/info', data.id]);
            })
          })
        }
        return of(true);
      }),
      catchError(() => {
        // Handle errors and deny access in case of failure
        
        return of(false);
      })
    );
  }
};
