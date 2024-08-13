import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AppStats from '../../models/dashboard/AppStats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getApplicationStats():Observable<AppStats>{
    return this.http.get<AppStats>('http://localhost:8080/api/v1/misc/stats');

  }
}
