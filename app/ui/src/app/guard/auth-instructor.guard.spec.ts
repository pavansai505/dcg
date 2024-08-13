import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authInstructorGuard } from './auth-instructor.guard';

describe('authInstructorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authInstructorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
