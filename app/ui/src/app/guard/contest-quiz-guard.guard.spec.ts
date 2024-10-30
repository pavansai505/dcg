import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contestQuizGuardGuard } from './contest-quiz-guard.guard';

describe('contestQuizGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contestQuizGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
