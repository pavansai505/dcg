import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getToken = (): string => {
    if (this.isBrowser) {
      return window.localStorage.getItem("jwt") || "";
    }
    return "";
  }

  setToken(key: string, value: any): void {
    if (this.isBrowser) {
      window.localStorage.setItem(key, value);
    }
  }
}
