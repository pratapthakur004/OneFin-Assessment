import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  isLoginOut=new BehaviorSubject(false);
  // Logout service
  logout() {
    localStorage.removeItem("_token");
    this.router.navigate([''])
  }

  isLoggedIn(): boolean {
    const data = localStorage.getItem("_token")
    if (!data) { return false }
    else { return true }
  }
  // Http methods
  post(data: any, endpoint: any): Observable<any> {
    return this.http.post(`${endpoint}`, data);
  }

  get(endpoint: any): Observable<any> {
    return this.http.get(`${endpoint}`)
  }
}
