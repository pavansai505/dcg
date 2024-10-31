import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AccessControlService } from '../services/auth/access-control.service';
import { ContestService } from '../services/contest/contest.service';
import { Contest } from '../models/contest/contest';

export const contestGuardGuard: CanActivateFn = (route, state) => {
  const contestService = inject(ContestService);
  const accessService = inject(AccessControlService);
  const router = inject(Router);

  // Extract contest ID from the route parameters
  const contestId = Number(route.paramMap.get('id'));

  if (!contestId) {
    // If no ID is present, deny access and navigate to /contests
    router.navigate(['/contests']);
    return of(false);
  }

  if (!accessService.isUser) {
    // Redirect to sign-in if the user is not authenticated
    router.navigate([`auth/user/signin`]);
    return of(false);
  }

  return contestService.getContestById(contestId).pipe(
    map((data: Contest) => !data.disabled),
    tap((isAccessible) => {
      if (!isAccessible) {
        router.navigate(['/contests']); // Redirect if the contest is disabled
      }
    }),
    catchError(() => {
      router.navigate(['/contests']); // Redirect on error
      return of(false);
    })
  );
};
