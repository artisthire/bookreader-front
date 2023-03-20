import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap, throwError } from 'rxjs';

import { apiEndpoints } from '../utils/api-endpoints';
import { IUser, UserService } from './user.service';

export interface ITokens {
  access: string;
  refresh: string;
}

interface IRegisterUser {
  name?: string;
  email: string;
  password: string;
}

type AuthUser = { user: IUser } & ITokens;

@Injectable()
export class AuthService {
  private ACCESS_TOKEN_KEY = 'accessToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient, private userService: UserService) {}

  login(userData: Omit<IRegisterUser, 'name'>): Observable<AuthUser> {
    return this.sendCredentials(userData);
  }

  register(userData: IRegisterUser): Observable<AuthUser> {
    return this.sendCredentials(userData);
  }

  logout(): Observable<void> {
    return this.http.get<void>(apiEndpoints.auth.logout).pipe(
      finalize(() => {
        this.clearTokens();
        this.userService.setUser(null);
      })
    );
  }

  saveTokens(tokens: ITokens): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);
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
      .get<Omit<ITokens, 'refresh'>>(apiEndpoints.auth.refresh, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .pipe(
        tap((resp) => localStorage.setItem(this.ACCESS_TOKEN_KEY, resp.access))
      );
  }

  getAuthorizationHeader(): string | null {
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);

    if (accessToken) {
      return `Bearer ${accessToken}`;
    }

    return null;
  }

  public deleteCredentials(): void {
    this.clearTokens();
    this.userService.setUser(null);
  }

  private clearTokens(): void {
    this.saveTokens({ access: '', refresh: '' });
  }

  private sendCredentials(userData: IRegisterUser): Observable<AuthUser> {
    // if have 'user name' it's register page
    const apiEndpoint = userData.name
      ? apiEndpoints.auth.register
      : apiEndpoints.auth.login;

    return this.http.post<AuthUser>(apiEndpoint, userData).pipe(
      tap((resp: AuthUser) => {
        this.saveTokens({ access: resp.access, refresh: resp.refresh });
        this.userService.setUser(resp.user);
      })
    );
  }
}
