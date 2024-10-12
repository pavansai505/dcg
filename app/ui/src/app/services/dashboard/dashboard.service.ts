import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AppStats from '../../models/dashboard/AppStats';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getApplicationStats():Observable<AppStats>{
    return this.http.get<AppStats>(environment.apiBaseUrl+'misc/stats');

  }
}
