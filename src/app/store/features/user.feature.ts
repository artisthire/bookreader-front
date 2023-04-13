import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { UserActions } from '../actions/user.actions';
import { IUser } from 'src/app/core/services/user/user.model';

export interface IUserState {
  user: IUser;
  userLoading: boolean;
}

export const initialUserState: IUserState = {
  user: { name: '', email: '', _id: '' },
  userLoading: false,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialUserState,
    on(UserActions.addUser, (_, { user }) => ({
      user,
      userLoading: false,
    })),
    on(UserActions.removeUser, (_) => ({ ...initialUserState })),
    on(UserActions.loadingUser, (state) => ({ ...state, userLoading: true }))
  ),
  extraSelectors: ({ selectUser }) => ({
    selectUserAuthorized: createSelector(selectUser, (user) =>
      Boolean(user._id)
    ),
  }),
});

export const {
  selectUserState,
  selectUser,
  selectUserLoading,
  selectUserAuthorized,
} = userFeature;
