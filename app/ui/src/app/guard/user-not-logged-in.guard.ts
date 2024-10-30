import { CanActivateFn, Router } from '@angular/router';
import { AccessControlService } from '../services/auth/access-control.service';
import { inject } from '@angular/core';

export const userNotLoggedInGuard: CanActivateFn = (route, state) => {
  const accessControl=inject(AccessControlService)
  const router=inject(Router)
  if(!accessControl.isLoggedin){
    return true
  }else{
    router.navigate([''])
    return false
  }
};
