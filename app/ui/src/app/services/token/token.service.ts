import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AccessControlService } from '../auth/access-control.service';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router:Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getToken = (key="jwt"): string => {
    if (this.isBrowser) {
      return window.localStorage.getItem(key) || "";
    }
    return "";
  }

  setToken(key: string, value: any): void {
    if (this.isBrowser) {
      window.localStorage.setItem(key, value);
    }
  }

  // Method to remove the token from local storage
  removeToken(key: string): void {
    if (this.isBrowser) {
      window.localStorage.removeItem(key);
      this.router.navigate(['/auth/user/signin'])
    }
  }
}
