import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

interface UserCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpService);
  private jwtService = inject(JwtHelperService);
  private router = inject(Router);

  constructor() {}

  login(credentials: UserCredentials): Observable<any> {
    const post = this.http.login(credentials);
    post.subscribe((response: any) => {
      this.saveToken(response.accessToken);
    });
    return post;
  }

  register(credentials: UserCredentials): Observable<any> {
    const post = this.http.register(credentials);
    post.subscribe((response: any) => {
      this.saveToken(response.accessToken);
    });
    return post;
  }

  logout(): Observable<any> {
    this.router.navigate(['/auth']);
    return this.http.logout({});
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  saveToken(token: string): void {
    if (!token) return;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): string | null {
    const token = this.getToken();
    if (!token) return null;
    return this.jwtService.decodeToken(token);
  }
}
