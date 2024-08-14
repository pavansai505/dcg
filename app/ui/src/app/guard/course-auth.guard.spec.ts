import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { courseAuthGuard } from './course-auth.guard';

describe('courseAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => courseAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
