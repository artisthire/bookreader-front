import { createFeatureSelector } from '@ngrx/store';
import { ILoginUser } from 'src/app/core/services/user/user.model';

export const selectUser = createFeatureSelector<Readonly<ILoginUser>>('user');
