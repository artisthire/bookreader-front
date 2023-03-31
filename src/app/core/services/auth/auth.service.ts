import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable, tap, throwError } from 'rxjs';

import { apiEndpoints } from '../../utils/api-endpoints';
import { UserActions } from 'src/app/store/actions/user.actions';
import { ICredentials, ITokens, IUserWithCredentials } from './auth.model';

@Injectable()
export class AuthService {
  private ACCESS_TOKEN_KEY = 'accessToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient, private store: Store) {}

  login(
    userData: Pick<ICredentials, 'email' | 'password'>
  ): Observable<IUserWithCredentials> {
    return this.getCredentials(userData, true);
  }

  register(userData: ICredentials): Observable<IUserWithCredentials> {
    return this.getCredentials(userData, false);
  }

  logout(): Observable<void> {
    return this.http.get<void>(apiEndpoints.auth.logout).pipe(
      finalize(() => {
        this.clearTokens();
        this.store.dispatch(UserActions.removeUser());
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
      return throwError(() => new Error('Not provided refresh token'));
    }

    return this.http
      .get<Pick<ITokens, 'access'>>(apiEndpoints.auth.refresh, {
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
    this.store.dispatch(UserActions.removeUser());
  }

  private clearTokens(): void {
    this.saveTokens({ access: '', refresh: '' });
  }

  private getCredentials(
    userData: ICredentials,
    isLogginRoute: boolean = false
  ): Observable<IUserWithCredentials> {
    const apiEndpoint = isLogginRoute
      ? apiEndpoints.auth.login
      : apiEndpoints.auth.register;

    return this.http.post<IUserWithCredentials>(apiEndpoint, userData).pipe(
      tap((resp: IUserWithCredentials) => {
        this.saveTokens({ access: resp.access, refresh: resp.refresh });
        this.store.dispatch(UserActions.addUser({ user: resp.user }));
      })
    );
  }
}
