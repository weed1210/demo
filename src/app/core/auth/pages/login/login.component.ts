import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { AUTHENTICATION_JWT } from 'src/app/core/ultilities/consts/cookie-key';
import { Store } from '@ngrx/store';
import { MembersActions } from '../../states/members.action';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../models/jwt-payload.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isBrowser: boolean;

  constructor(
    private memberService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store,
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    let request = this.loginForm.value;
    console.warn(request);

    this.memberService.login(request)
      .subscribe({
        next: res => {
          console.log(res);
          this.cookieService.set(AUTHENTICATION_JWT, res);
          var memberToken = jwtDecode(res) as JwtPayload;
          this.store.dispatch(MembersActions.login({
            member: memberToken
          }));
          this.router.navigate(['tasks']);
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
