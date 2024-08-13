import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient){}

  createOrder(data:any):Observable<any> {
    return this.http.post("http://localhost:8080/api/v1/payment/createOrder",data);
  }
  verifyOrder(data:any):Observable<any>{
    return this.http.put("",{});
  }
}
