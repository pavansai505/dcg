import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CouponResponse } from '../../models/coupon/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiBaseUrl = environment.apiBaseUrl + 'coupon/';

  constructor(private http: HttpClient) { }
  isCouponValid(code:string): Observable<CouponResponse> {
    return this.http.get<CouponResponse>(this.apiBaseUrl +'check/'+ code);
  }
  applyCoupon(code:string,data:any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl +'apply',{
      couponCode:code,paymentId:data.id
    });
  }
  useCoupon(code:string): Observable<any> {
    return this.http.put<any>(this.apiBaseUrl +'use?code='+code,{code:code});
  }
}
