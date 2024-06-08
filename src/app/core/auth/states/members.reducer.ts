import { createReducer, on } from '@ngrx/store';
import { MembersActions } from './members.action';
import { Member } from '../models/member.model';
import { state } from '@angular/animations';

let defaultMember: Member = {
  id: '',
  email: '',
  password: '',
  name: '',
  phoneNumber: ''
}

export const initialState: Readonly<Member> = defaultMember;

export const memberReducer = createReducer(
  initialState,
  on(MembersActions.logout, (state, { id }) =>
    state = defaultMember
  ),
  on(MembersActions.login, (_state, { member }) => {
    return member;
  })
);