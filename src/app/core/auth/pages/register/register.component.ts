import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-register-tab',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  memberRegisterForm: FormGroup;

  constructor(private memberService: AuthService, private router: Router) {
    this.memberRegisterForm = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
      password: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
  }

  onSubmit() {
    let request = this.memberRegisterForm.value;
    console.warn(request);

    this.memberService.register(request)
      .subscribe({
        next: res => {
          console.log(res);
          this.router.navigate(["login"]);
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
