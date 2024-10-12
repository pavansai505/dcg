import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { courseQuizGuard } from './course-quiz.guard';

describe('courseQuizGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => courseQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
