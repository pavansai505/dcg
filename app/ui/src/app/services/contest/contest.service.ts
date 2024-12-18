import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateContestRequest } from '../../models/course/CreateContestRequest';
import { ScoreCheckResponse } from '../../models/contest/scoreCheckResponse';
import { Contest } from '../../models/contest/contest';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  private apiBaseUrl = environment.apiBaseUrl + 'contest/';

  constructor(private http: HttpClient) { }
  addContest(data:Contest): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl.slice(0,-1),data);
  }
  getContests(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'get');
  }
  getContestById(id:number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'get/'+id);
  }
  getValidContests(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'get/valid');
  }
  getStartedContests(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'get/started');
  }
  createContest(contest:CreateContestRequest): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl ,contest);
  }
  registerToContests(id:number): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + id+"/register",{});
  }
  isUserRegisteredToContest(id:number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + id+"/is-user-registered");
  }
  toggleContestStatus(id:number): Observable<any> {
    return this.http.patch<any>(this.apiBaseUrl + id+"/toggle/status",{});
  }

  



}
