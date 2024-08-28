import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { coursePurchaseAuthGuard } from './course-purchase-auth.guard';

describe('coursePurchaseAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => coursePurchaseAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
