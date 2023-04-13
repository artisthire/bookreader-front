import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { IUser } from './user.model';
import { apiEndpoints } from '../../utils/api-endpoints';
import { UserActions } from 'src/app/store/actions/user.actions';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private store: Store) {}

  public getUser(): Observable<IUser> {
    return this.http
      .get<IUser>(apiEndpoints.user)
      .pipe(tap((user) => this.store.dispatch(UserActions.addUser({ user }))));
  }
}
