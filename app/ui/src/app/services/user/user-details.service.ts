import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  headers: any;
  constructor(private http: HttpClient, private token: TokenService) {}

  getMyDetails = (): Observable<User> => {
    return this.http.get<User>(environment.apiBaseUrl + 'user/getMyDetails', {
      headers: {
        Authorization: 'Bearer ' + this.token.getToken(),
      },
    });
  };
  getUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(environment.apiBaseUrl + 'user');
  };
  getUserById = (id: number): Observable<any> => {
    return this.http.get<any>(environment.apiBaseUrl + 'user/getById/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.token.getToken(),
      },
    });
  };
  getRegisteredCourses = (): Observable<any> => {
    return this.http.get<any>(
      environment.apiBaseUrl + 'user/registered-courses'
    );
  };
  emailSubscriptionToggle = (): Observable<any> => {
    return this.http.put<any>(
      environment.apiBaseUrl + 'user/subscribe-to-email',
      {}
    );
  };
  updateUser = (user: User): Observable<any> => {
    return this.http.put<any>(environment.apiBaseUrl + 'user/update', user);
  };

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const url = `${environment.apiBaseUrl}user/uploadImage`; // Adjust according to your API endpoint
    return this.http.post<any>(url, formData);
  }
  promoteUser(userId: number, role: string): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}role/promote/${userId}`,
      { role }
    );
  }

  removeRole(userId: number, role: string): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}role/demote/${userId}`,
      { role }
    );
  }
  toggleUserStatus(id: number): Observable<any> {
    return this.http.patch<any>(
      `${environment.apiBaseUrl}user/${id}/toggle/status`,
      {}
    );
  }

  addUsers(users: any[]): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}user/bulk-add`, users);
  }
}
