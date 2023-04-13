import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ITokens } from 'src/app/core/services/auth/auth.model';

export const TokensActions = createActionGroup({
  source: 'Tokens',
  events: {
    'Add Tokens': props<{ tokens: ITokens }>(),
    'Remove Tokens': emptyProps(),
  },
});
