import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ScoreService } from '../services/score/score.service';
import { ContestService } from '../services/contest/contest.service';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'; // Assuming you have an AccessService to check user status
import { AccessControlService } from '../services/auth/access-control.service';

export const contestQuizGuardGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const scoreService = inject(ScoreService);
  const contestService = inject(ContestService);
  const accessService = inject(AccessControlService); // AccessService to determine if the user is logged in
  const router = inject(Router);
  const contestId = route.params['id'];
  console.log("ok");
  
  if (!accessService.isUser) {
    // If user is not logged in, redirect to login or appropriate page
    router.navigate(['/login']);
    return of(false); // Deny access
  }

  return contestService.getContestById(contestId).pipe(
    switchMap(contest => {
      // Check if the contest has started
      const timestamp1 = new Date(contest.startDate);
      const timestamp2 = new Date(contest.endDate);
      const now = new Date();
      const isContestStarted = now >= timestamp1 && now <= timestamp2;

      // Check if user is registered for the contest
      return contestService.isUserRegisteredToContest(contestId).pipe(
        switchMap(registrationData => {
          const isRegistered = registrationData.resultTrue;

          // Check if user has already participated
          return scoreService.didUserParticipate(contestId).pipe(
            tap(participationData => {
              if (participationData.userHaveScore) {
                // Navigate to the contests info page if the user has participated
                router.navigate(['/contests', contestId, 'info']);
              }
            }),
            map(participationData => {
              const userHasTried = participationData.userHaveScore;
              console.log(isContestStarted,isRegistered,userHasTried);
              
              // Allow access if the contest has started, user is registered, and has not tried
              if (isContestStarted && isRegistered && !userHasTried) {
                return true; // Allow access to the route
              } else {
                // Redirect if any condition fails
                if (!isContestStarted) {
                  console.log('Contest has not started yet.');
                } else if (!isRegistered) {
                  console.log('User is not registered for this contest.');
                } else {
                  console.log('User has already attempted this contest.');
                }
                router.navigate(['/contests', contestId, 'info']); // Navigate to contest info page
                return false; // Deny access
              }
            })
          );
        })
      );
    }),
    catchError((error) => {
      console.error('Error fetching contest data', error);
      router.navigate(['/contests']); // Navigate away on error
      return of(false); // Deny access
    })
  );
};
