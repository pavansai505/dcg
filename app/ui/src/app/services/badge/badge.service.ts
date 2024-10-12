import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  private apiBaseUrl = environment.apiBaseUrl + 'badges/';

  constructor(private http: HttpClient) { }

  // 1. Get all badges
  getAllBadges(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl);
  }

  // 2. Get all badges of the authenticated user
  getBadgesForAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'user');
  }

  // 3. Create a badge
  createBadge(request: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl, request);
  }

  // 4. Get badges by course ID
  getBadgesByCourseId(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}course/${courseId}`);
  }

  // 5. Set badges to authenticated user by course ID
  awardBadgesToAuthenticatedUserByCourseId(courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}award/course/${courseId}`, {});
  }
}
