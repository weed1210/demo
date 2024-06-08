import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { AUTHENTICATION_JWT } from 'src/app/core/ultilities/consts/cookie-key';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private memberService: AuthService,
    private cookieService: CookieService,
    private router: Router,
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

          this.memberService.getPosts()
            .subscribe({
              next: res => {
                console.log(res);
              },
              error: err => {
                console.log(err);
              }
            });
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
