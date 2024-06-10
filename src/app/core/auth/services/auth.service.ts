import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Member } from '../models/member.model';
import { RegisterRequest } from '../models/register.request';
import { LoginRequest } from '../models/login.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(request: RegisterRequest): Observable<Member> {
    return this.http.post<Member>(
      'Members/Register', request
    );
  }

  login(request: LoginRequest): Observable<string> {
    return this.http.post<{ access_token: string }>(
      'Users/Login', request
    )
      .pipe(
        map(x => x.access_token)
      );
  }
}
