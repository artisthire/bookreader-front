import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  EMPTY,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
  timeout,
} from 'rxjs';

import { API_URL } from '../injection-tokens/injection-tokens';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private PUBLIC_API_ENDPOINTS: string[] = [
    'auth/login',
    'auth/register',
    'auth/refresh',
  ];
  private tokenRefreshing: boolean = false;
  private tokenRefreshTimeout: number = 30000;
  private tokenRefreshSource$ = new Subject();
  private tokenRefreshed$ = this.tokenRefreshSource$.asObservable();

  constructor(
    @Inject(API_URL) private API_URL: string,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> | Observable<never> {
    let cloneReq = req.clone({ url: `${this.API_URL}/${req.url}` });

    if (!this.PUBLIC_API_ENDPOINTS.includes(req.url)) {
      cloneReq = this.addAuthHeader(cloneReq);
    }

    return next
      .handle(cloneReq)
      .pipe(
        catchError((error) => this.handleResponseError(error, cloneReq, next))
      );
  }

  private handleResponseError(
    error: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> | Observable<never> {
    if (error.status === 401) {
      if (error.url?.endsWith('/refresh')) {
        this.tokenRefreshing = false;
        this.logout();
        return EMPTY;
      }

      return this.refreshToken().pipe(
        timeout({ each: this.tokenRefreshTimeout, meta: { url: error.url } }),
        switchMap(() => {
          const authReq = this.addAuthHeader(req);
          return next.handle(authReq);
        })
      );
    }

    return throwError(() => error);
  }

  private refreshToken(): Observable<any> {
    if (this.tokenRefreshing) {
      return new Observable((sub) => {
        this.tokenRefreshed$.subscribe(() => {
          sub.next();
          sub.complete();
        });
      });
    } else {
      this.tokenRefreshing = true;

      return this.authService.refreshToken().pipe(
        tap(() => {
          this.tokenRefreshing = false;
          this.tokenRefreshSource$.next(null);
        }),
        catchError(() => {
          this.tokenRefreshing = false;
          this.logout();
          return EMPTY;
        })
      );
    }
  }

  private logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  private addAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authHeader = this.authService.getAuthorizationHeader();

    if (authHeader) {
      return req.clone({ setHeaders: { Authorization: authHeader } });
    }

    return req;
  }
}