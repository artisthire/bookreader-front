import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable, tap, throwError } from 'rxjs';

import { apiEndpoints } from '../../utils/api-endpoints';
import { IAuthData, ITokens, IUserWithCredentials } from './auth.model';
import { UserActions } from 'src/app/store/actions/user.actions';
import { TokensActions } from 'src/app/store/actions/tokens.actions';
import { selectTokens } from 'src/app/store/features/tokens.feature';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  login(
    authData: Pick<IAuthData, 'email' | 'password'>
  ): Observable<IUserWithCredentials> {
    return this.updateCredentials(authData, true);
  }

  register(authData: IAuthData): Observable<IUserWithCredentials> {
    return this.updateCredentials(authData, false);
  }

  logout(): Observable<void> {
    this.store.dispatch(UserActions.loadingUser());

    return this.http.get<void>(apiEndpoints.auth.logout).pipe(
      finalize(() => {
        this.deleteCredentials();
      })
    );
  }

  saveTokens({ access, refresh }: ITokens): void {
    this.store.dispatch(
      TokensActions.addTokens({ tokens: { access, refresh } })
    );
  }

  refreshToken(): Observable<Object> {
    let refreshToken = '';
    this.store
      .select(selectTokens)
      .subscribe(({ refresh }) => (refreshToken = refresh));

    if (!refreshToken) {
      return throwError(() => new Error('Not provided refresh token'));
    }

    return this.http
      .get<Pick<ITokens, 'access'>>(apiEndpoints.auth.refresh, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .pipe(
        tap(({ access }) =>
          this.store.dispatch(
            TokensActions.addTokens({
              tokens: { access, refresh: refreshToken },
            })
          )
        )
      );
  }

  getAuthorizationHeader(): string | null {
    let accessToken = '';
    this.store
      .select(selectTokens)
      .subscribe(({ access }) => (accessToken = access));

    if (accessToken) {
      return `Bearer ${accessToken}`;
    }

    return null;
  }

  public deleteCredentials(): void {
    this.store.dispatch(UserActions.removeUser());
    this.store.dispatch(TokensActions.removeTokens());
  }

  private updateCredentials(
    authData: IAuthData,
    isLogginRoute: boolean = false
  ): Observable<IUserWithCredentials> {
    const apiEndpoint = isLogginRoute
      ? apiEndpoints.auth.login
      : apiEndpoints.auth.register;

    this.store.dispatch(UserActions.loadingUser());

    return this.http.post<IUserWithCredentials>(apiEndpoint, authData).pipe(
      tap(({ user, access, refresh }: IUserWithCredentials) => {
        this.store.dispatch(UserActions.addUser({ user }));
        this.store.dispatch(
          TokensActions.addTokens({
            tokens: { access, refresh },
          })
        );
      })
    );
  }
}
