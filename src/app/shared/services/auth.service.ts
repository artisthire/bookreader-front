import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private ACCESS_TOKEN_KEY = 'accessToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient) {}

  login(tokens: ITokens): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
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
      return throwError(
        () =>
          // emmit HttpErrorResponse for right process in HttpInterceptor error handler
          new HttpErrorResponse({
            error: new Error('Not provided refresh token'),
            status: 401,
          })
      );
    }

    return this.http
      .get<{ access: string }>('auth/refresh', {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .pipe(
        tap((res) => localStorage.setItem(this.ACCESS_TOKEN_KEY, res.access))
      );
  }
}
