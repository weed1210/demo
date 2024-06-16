import { createReducer, on } from '@ngrx/store';
import { MembersActions } from './members.action';
import { JwtPayload } from '../models/jwt-payload.model';

let defaultMember: JwtPayload = {
  UserId: '',
  Email: '',
  PhoneNumber: ''
}

export const initialMemberState: Readonly<JwtPayload> = defaultMember;

export const memberReducer = createReducer(
  initialMemberState,
  on(MembersActions.logout, (state, { id }) =>
    state = defaultMember
  ),
  on(MembersActions.login, (_state, { member }) => {
    return member;
  })
);