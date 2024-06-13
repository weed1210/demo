import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Dictionary } from 'src/app/share/models/dictionary.model';
import { ErrorDialogComponent } from 'src/app/share/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'auth-register-tab',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  memberRegisterForm: FormGroup;
  emailValidationError: Dictionary<string, string> = {
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
  };

  nameValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Name is required.'
      }
    ]
  };

  passwordValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Password is required.'
      }
    ]
  };

  phoneNumberValidationError: Dictionary<string, string> = {
    data: [
      {
        key: 'required',
        value: 'Phonenumber is required.'
      },
      {
        key: 'email',
        value: 'Phonenumber must be 10 digit format.'
      }
    ]
  };

  constructor(private memberService: AuthService, private router: Router, private dialog: MatDialog) {
    this.memberRegisterForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
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
          this.dialog.open(ErrorDialogComponent, {
            data: err.Message
          });
        }
      });
  }
}
