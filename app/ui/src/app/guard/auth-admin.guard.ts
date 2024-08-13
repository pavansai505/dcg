import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AccessControlService } from '../services/auth/access-control.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const accessControl=inject(AccessControlService)
  const router=inject(Router)
  if(accessControl.isAdmin){
    return true
  }else{
    router.navigate(['auth/admin/signin'],{queryParams:{'redirectURL':state.url}})
    return false
  }
};
 