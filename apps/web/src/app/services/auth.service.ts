import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: "root" }) //todo: test
export class AuthService {
  private apiUrl = "http://localhost:3000/auth"; //todo

  constructor(private http: HttpClient) {} //todo: usar esto o inject

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
    return isAuthenticated;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log(response)
        localStorage.setItem("token", response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}