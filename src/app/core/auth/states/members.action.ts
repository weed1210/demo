import { createActionGroup, props } from '@ngrx/store';
import { JwtPayload } from '../models/jwt-payload.model';

export const MembersActions = createActionGroup({
  source: 'Member',
  events: {
    'Login': props<{ member: JwtPayload }>(),
    'Logout': props<{ id: string }>(),
  },
});