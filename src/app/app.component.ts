import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from './core/auth/services/cookie.service';
import { AUTHENTICATION_JWT } from './share/consts/cookie-key';
import { JwtPayload } from './core/auth/models/jwt-payload.model';
import { MembersActions } from './core/auth/states/members.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private store: Store,
    private cookieService: CookieService,
  ) {
    var jwtToken = this.cookieService.get(AUTHENTICATION_JWT);
    if (jwtToken) {
      var memberToken = jwtDecode(jwtToken) as JwtPayload;
      this.store.dispatch(MembersActions.login({
        member: memberToken
      }))
    }
  }
}
