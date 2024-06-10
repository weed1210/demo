import { createReducer, on } from '@ngrx/store';
import { MembersActions } from './members.action';
import { JwtPayload } from '../models/jwt-payload.model';

let defaultMember: JwtPayload = {
  UserID: '',
  Email: '',
  PhoneNumber: ''
}

export const initialState: Readonly<JwtPayload> = defaultMember;

export const memberReducer = createReducer(
  initialState,
  on(MembersActions.logout, (state, { id }) =>
    state = defaultMember
  ),
  on(MembersActions.login, (_state, { member }) => {
    return member;
  })
);