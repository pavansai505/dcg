import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { titleGuardGuard } from './title-guard.guard';

describe('titleGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => titleGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
