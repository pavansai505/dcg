import { CanActivateFn, Router } from '@angular/router';
import { AccessControlService } from '../services/auth/access-control.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const accessControl=inject(AccessControlService)
  const router=inject(Router)
  if(accessControl.isUser){
    return true
  }else{
    router.navigate(['auth/user/signin'],{queryParams:{'redirectURL':state.url}})
    return false
  }
};
 