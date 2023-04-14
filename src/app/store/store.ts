import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { userFeature } from './features/user.feature';
import { tokensFeature } from './features/tokens.feature';

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: [tokensFeature.name], rehydrate: true })(
    reducer
  );
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];
export const reducers = {
  [userFeature.name]: userFeature.reducer,
  [tokensFeature.name]: tokensFeature.reducer,
};
