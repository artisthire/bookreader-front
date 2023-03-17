import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  emailValidator,
  passwordValidator,
} from 'src/app/shared/utils/auth-form-validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  public loginForm = this.fb.group({
    email: ['', [emailValidator]],
    password: ['', [passwordValidator]],
  });

  public emailInput = this.loginForm.controls.email;
  public passwordInput = this.loginForm.controls.password;

  public onSubmit(): void {
    this.formSubmitted = true;
    console.log(this.loginForm);
  }
}
