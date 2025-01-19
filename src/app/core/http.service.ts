import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  constructor() {}

  login<T>(credentials: T): Observable<any> {
    return this.http.post<any>('/auth/login', credentials);
  }

  register<T>(user: T): Observable<any> {
    return this.http.post<any>('/auth/register', user);
  }

  logout<T>(user: T): Observable<any> {
    return this.http.post<any>('/auth/logout', user);
  }
}
