import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

export interface ITokens {
  access: string;
  refresh: string;
}

@Injectable()
export class AuthService {
  private ACCESS_TOKEN_KEY = 'accessToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient) {}

  login(tokens: ITokens): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);
  }

  logout(): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, '');
    localStorage.setItem(this.REFRESH_TOKEN_KEY, '');
  }

  getAuthorizationHeader(): string | null {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);

    if (accessToken) {
      return `Bearer ${accessToken}`;
    }

    return null;
  }

  refreshToken(): Observable<Object> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      return throwError(() => new Error('Not provide refresh token'));
    }

    return this.http.get('auth/refresh', {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
  }
}
