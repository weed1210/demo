import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { AUTHENTICATION_JWT } from 'src/app/share/consts/cookie-key';
import { Store } from '@ngrx/store';
import { MembersActions } from '../../states/members.action';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../models/jwt-payload.model';
import { Dictionary } from 'src/app/share/models/dictionary.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/share/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  userNameValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Email is required.'
      },
      {
        key: 'email',
        value: 'Must be in email format.'
      }
    ]
  }

  passwordValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Password is required.'
      }
    ]
  }

  constructor(
    private memberService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
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
          this.dialog.open(ErrorDialogComponent, {
            data: err.Message
          });
        }
      });
  }
}
