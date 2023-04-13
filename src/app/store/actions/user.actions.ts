import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from 'src/app/core/services/user/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Add User': props<{ user: IUser }>(),
    'Remove User': emptyProps(),
    'Loading User': emptyProps(),
  },
});
