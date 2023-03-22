import { createReducer, on } from '@ngrx/store';

import { UserActions } from '../actions/user.actions';
import { ILoginUser } from 'src/app/core/services/user/user.model';

export const initialState: Readonly<ILoginUser> = {
  name: '',
  email: '',
  _id: '',
  login: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (_, { user }) => ({ ...user, login: true })),
  on(UserActions.removeUser, (_) => initialState)
);
