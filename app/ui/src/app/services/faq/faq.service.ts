import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import FAQ from '../../models/faq/FAQ';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private apiUrl = environment.apiBaseUrl + 'faq';
  constructor(private http: HttpClient) {}
  getApplicationFaq(): Observable<any> {
    return this.http.get<FAQ[]>(`${this.apiUrl}/get`);
  }
  getFaqById(id: number): Observable<any> {
    return this.http.get<FAQ>(`${this.apiUrl}/get/${id}`);
  }
  addFaq(faq: FAQ[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, faq);
  }
  deleteFaq(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  getCatgories(): Observable<any> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }
}
