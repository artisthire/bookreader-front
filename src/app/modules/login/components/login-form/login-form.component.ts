import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectUserLoading } from 'src/app/store/features/user.feature';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  emailValidator,
  passwordValidator,
} from 'src/app/shared/utils/auth-form-validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public loginForm = this.fb.group({
    email: ['', [emailValidator]],
    password: ['', [passwordValidator]],
  });
  public emailInput = this.loginForm.controls.email;
  public passwordInput = this.loginForm.controls.password;
  public formSubmitted: boolean = false;
  public loading: boolean = false;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectUserLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((userLoading) => {
        this.loading = userLoading;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.formSubmitted = true;
    const { email, password } = this.loginForm.value;

    if (email && password && this.loginForm.valid) {
      this.authService
        .login({ email, password })
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
