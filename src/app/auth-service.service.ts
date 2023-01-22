import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LoginRequest } from './Request/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient:HttpClient) { }

  login(loginRequest:LoginRequest):Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/user/signin',loginRequest)
  }

  getCurrentUser() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user'));
  }
}
