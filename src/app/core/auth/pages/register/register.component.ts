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
      },
      {
        key: 'pattern',
        value: 'Password is atlest 8 character with lowercase, uppercase, number, special.'
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
        key: 'pattern',
        value: 'Phonenumber must be 10 digit format.'
      }
    ]
  };

  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog) {
    this.memberRegisterForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$")
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
    });
  }

  onSubmit() {
    let request = this.memberRegisterForm.value;

    this.authService.register(request)
      .subscribe({
        next: res => {
          console.log(res);
          this.router.navigate(["login"]);
        },
        error: (err: Error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: err.message
          });
        }
      });
  }
}
