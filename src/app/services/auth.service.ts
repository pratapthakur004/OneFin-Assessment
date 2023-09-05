import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  // Logout service
  logout() {
    localStorage.removeItem("_token");
    this.router.navigate([''])
  }

  // Http methods
  post(data: any, endpoint: any): Observable<any> {
    return this.http.post(`${endpoint}`, data);
  }

  get(endpoint: any): Observable<any> {
    return this.http.get(`${endpoint}`)
  }
}
