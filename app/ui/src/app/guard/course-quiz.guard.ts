import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CourseDataService } from '../services/course/course-data.service';
import { of, catchError, map, switchMap } from 'rxjs';
import { CourseActionHistory } from '../models/course/courseActionHistory';

export const courseQuizGuard: CanActivateFn = (route, state) => {
  const courseActionHistoryService = inject(CourseDataService);
  const router = inject(Router);
  const code = route.paramMap.get('id');

  if (code == null) {
    // If there is no course code, allow access or handle as needed
    return true;
  }

  return courseActionHistoryService.getCourseHistoryByCode(code).pipe(
    map((data: CourseActionHistory) => {
      // Handle the successful response here
      console.log('Course Action History:', data);
      // Allow access based on your logic
      return data.percentageCompleted ===100; // Replace with your actual condition
    }),
    catchError((err) => {
      console.error('Error fetching course action history:', err);
      // Optionally navigate to a different route or handle the error as needed
      router.navigate(['courses/home']);
      // Deny access
      return of(false);
    })
  );
};
