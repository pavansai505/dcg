import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreCheckResponse } from '../../models/contest/scoreCheckResponse';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private apiBaseUrl = environment.apiBaseUrl + 'score/';

  constructor(private http: HttpClient) { }
  didUserParticipate(id:number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl +'checkScore?quizId='+id);
  }
  setUserScore(data:ScoreCheckResponse): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + 'setScore',data);
  }
  getScoresByQuiz(id:number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'scores-by-quiz?quizId='+id);
  }
}
