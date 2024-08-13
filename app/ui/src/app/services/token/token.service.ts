import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  getToken=()=>{
    return window.sessionStorage.getItem("jwt") || ""
  }
  setToken(key:string,value:any){

    window.sessionStorage.setItem(key,value)

  }
}
