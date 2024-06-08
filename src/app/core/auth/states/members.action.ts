import { createActionGroup, props } from '@ngrx/store';
import { Member } from '../models/member.model';

export const MembersActions = createActionGroup({
  source: 'Member',
  events: {
    'Login': props<{ member: Member }>(),
    'Logout': props<{ id: string }>(),
  },
});