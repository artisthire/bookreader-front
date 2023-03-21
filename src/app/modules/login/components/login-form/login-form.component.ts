import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
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
  public loading: boolean = false;
  public loginForm = this.fb.group({
    email: ['', [emailValidator]],
    password: ['', [passwordValidator]],
  });
  public emailInput = this.loginForm.controls.email;
  public passwordInput = this.loginForm.controls.password;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public onSubmit(): void {
    this.formSubmitted = true;
    const { email, password } = this.loginForm.value;

    if (email && password && this.loginForm.valid) {
      this.loading = true;
      this.authService
        .login({ email, password })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
