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
    public authService: AuthService,
    public cookieService: CookieService,
    public router: Router,
    public store: Store,
    public dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    let request = this.loginForm.value;

    this.authService.login(request)
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
        error: (err: Error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: err.message
          });
        }
      });
  }
}
