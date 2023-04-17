import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, of, zip, map, concatMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserService } from '../user/user.service';
import { selectTokens } from 'src/app/store/features/tokens.feature';
import { selectUserAuthorized } from 'src/app/store/features/user.feature';

export const authGuard: CanActivateFn = (_, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const store = inject(Store);
  const isAuthPages = state.url === '/login' || state.url === '/register';
  const userService = inject(UserService);

  return zip(
    store.select(selectTokens),
    store.select(selectUserAuthorized)
  ).pipe(
    concatMap(([{ access: accessToken }, userAuthorized]) => {
      if (isAuthPages) {
        if (accessToken === '') {
          return of(true);
        }

        if (userAuthorized) {
          return of(router.parseUrl('/'));
        }
      }

      if (accessToken === '') {
        return of(router.parseUrl('/login'));
      }

      if (userAuthorized) {
        return of(true);
      }

      return userService.getUser().pipe(
        map(() => router.parseUrl('/')),
        catchError(() => of(false))
      );
    })
  );

  // return store.select(selectTokens)
  //   .pipe(mergeMap(
  //     ({access}) => store.select(selectUserAuthorized).pipe(map((userAuthorized) => ({access, userAuthorized}))) ));

  // .pipe(
  //   map(([{ access: accessToken }, userAuthorized]) => {
  //     if (isAuthPages) {
  //       if (accessToken === '') {
  //         return of(true);
  //       }

  //       if (userAuthorized) {
  //         return of(router.parseUrl('/'));
  //       }
  //     }

  //     if (accessToken === '') {
  //       return of(router.parseUrl('/login'));
  //     }

  //     if (userAuthorized) {
  //       return true;
  //     }

  //     return userService.getUser().pipe(
  //       mergeMap(() => of(router.parseUrl('/'))),
  //       catchError(() => of(router.parseUrl('/login')))
  //     );

  //     // if (access === '') {
  //     //   if (isAuthPages) {
  //     //     return true;
  //     //   }

  //     //   return router.parseUrl('/login');
  //     // }

  //     // if (userAuthorized) {
  //     //   if (isAuthPages) {
  //     //     return router.parseUrl('/');
  //     //   }

  //     //   return true;
  //     // }

  //     // if (isAuthPages) {
  //     //   return true;
  //     // }

  //     // return userService.getUser().pipe(
  //     //   map(() => of(userAuthorizedSuccess)),
  //     //   catchError(() => of(userAuthorizedReject))
  //     // );
  //   })

  // return store.select(selectTokens).pipe(
  //   map(({ access }) => {
  //     if (access === '') {
  //       if (state.url.endsWith('login')) {
  //         return of(true);
  //       }

  //       return of(router.parseUrl('/login'));
  //     }

  //     return userService.getUser().pipe(
  //       map(() => of(userAuthorizedSuccess)),
  //       catchError(() => of(userAuthorizedReject))
  //     );
  //   })
  // );

  // store.select(selectTokens)

  // return userService.getUser().pipe(
  //   map(() => true),
  //   catchError(() => of(router.parseUrl('/login')))
  // );

  // return router.parseUrl('/login');
};
