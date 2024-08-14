import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient){}

  createOrder(data:any):Observable<any> {
    return this.http.post(environment.apiBaseUrl+"payment/createOrder",data);
  }
  verifyOrder(data:any):Observable<any>{
    return this.http.put("",{});
  }
}
