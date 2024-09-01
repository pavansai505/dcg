import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CourseDataService } from '../services/course/course-data.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccessControlService } from '../services/auth/access-control.service';
import { ContestService } from '../services/contest/contest.service';

export const contestGuardGuard: CanActivateFn = (route, state) => {
  const contestService = inject(ContestService);
  const accessService = inject(AccessControlService);
  const router = inject(Router);

  // Extract contest ID from the route parameters
  const contestId = Number(route.paramMap.get('id'));

  if (!contestId) {
    // If no ID is present, deny access
    return of(false);
  }

  if (!accessService.isUser) {
    // Redirect to sign-in if the user is not authenticated
    router.navigate([`auth/user/signin`]);
    return of(false);
  }

  return contestService.getContestById(contestId).pipe(
    map(data => {
      const now = new Date();
      const isBetween = now >= new Date(data.startDate) && now <= new Date(data.endDate);

      if (!isBetween) {
        // If the contest is ongoing, redirect to the contest info page
        router.navigate([`contests/${contestId}/info`]);
        return false;
      }

      return data;
    }),
    switchMap(data => 
      contestService.isUserRegisteredToContest(contestId).pipe(
        map(registration => {
          if (registration.resultTrue) {
            return true;
          } else {
            // If the user is not registered, redirect to the contest info page
            router.navigate([`contest/${contestId}/info`]);
            return false;
          }
        })
      )
    ),
    catchError(() => {
      // Handle errors by redirecting or denying access
      router.navigate([`contests/${contestId}/info`]);
      return of(false);
    })
  );
};
