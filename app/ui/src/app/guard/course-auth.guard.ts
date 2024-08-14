import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CourseDataService } from '../services/course/course-data.service';
import { catchError, of, switchMap } from 'rxjs';
import CourseRegister from '../models/course/courseRegister';

export const courseAuthGuard: CanActivateFn = (route, state) => {
  const courseAccess = inject(CourseDataService);
  const router = inject(Router);
  
  // Extract course ID from the route parameters
  const courseId = route.paramMap.get('id');
  console.log(courseId);
  
  
  if (!courseId) {
    // If no ID is present, deny access
    return of(false);
  }

  return courseAccess.isCourseRegistered({ "courseId":+courseId }).pipe(
    switchMap((data) => {
      console.log(data);
      
      // Return registration status
      if(!data.registered){
        router.navigate(['/courses/course/info', courseId]);
      }
      return of(data.registered);
    }),
    catchError(() => {
      // Handle errors and deny access in case of failure
      
      return of(false);
    })
  );
};
