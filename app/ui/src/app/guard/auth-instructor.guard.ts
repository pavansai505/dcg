import { CanActivateFn, Router } from '@angular/router';
import { AccessControlService } from '../services/auth/access-control.service';
import { inject } from '@angular/core';

export const authInstructorGuard: CanActivateFn = (route, state) => {
  const accessControl=inject(AccessControlService)
  const router=inject(Router)
  if(accessControl.isInstructor){
    return true
  }else{
    router.navigate(['auth/user/signin'],{queryParams:{'redirectURL':state.url}})
    return false
  }
};
