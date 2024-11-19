import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast.service';
import { AccessControlService } from '../services/auth/access-control.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const httpClient = inject(HttpClient);
  const toast=inject(ToastService)
  const authToken = tokenService.getToken();
  const refreshToken = tokenService.getToken("refreshToken");
  const access=inject(AccessControlService)
  // Function to check token expiration
  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true; // If no token, consider it expired
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    return payload.exp * 1000 < Date.now(); // Check expiration
  };

  // If the request is to auth, proceed without adding the token
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  // If the token is expired, attempt to refresh it
  if (authToken && isTokenExpired(authToken)) {
    // Attempt to refresh the token
    return httpClient.post('/api/v1/user/auth/refresh', { refreshToken }).pipe(
      switchMap((response: any) => {
        // Assuming the response contains the new tokens
        tokenService.setToken("jwt",response.token);
        tokenService.setToken('refreshToken', response.refreshToken);

        // Clone the original request with the new token
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${response.token}`)
        });

        return next(authReq); // Proceed with the original request
      }),
      catchError((error) => {
        // If the refresh token fails, notify the user to log in again
        toast.showToast("Your session has expired. Please log in again to continue.", "warning");
        
        // Clear tokens from storage
        tokenService.removeToken("jwt");
        tokenService.removeToken("refreshToken");
        
        // Optionally, you can log the error for debugging
        console.error("Token refresh failed:", error);
        
        return throwError(() => new Error("Refresh token failed. User needs to log in again."));
    })  
    );
  } else {
    // If the token is still valid, clone the original request and set the Authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next(authReq); // Proceed with the original request
  }
};
