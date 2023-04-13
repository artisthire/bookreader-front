import { createFeature, createReducer, on } from '@ngrx/store';

import { TokensActions } from '../actions/tokens.actions';
import { ITokens } from 'src/app/core/services/auth/auth.model';

export interface ITokensState {
  tokens: ITokens;
}

export const initialTokensState: ITokensState = {
  tokens: { access: '', refresh: '' },
};

export const tokensFeature = createFeature({
  name: 'tokens',
  reducer: createReducer(
    initialTokensState,
    on(TokensActions.addTokens, (_, { tokens }) => ({
      tokens,
    })),
    on(TokensActions.removeTokens, (_) => ({ ...initialTokensState }))
  ),
});

export const { selectTokens } = tokensFeature;
