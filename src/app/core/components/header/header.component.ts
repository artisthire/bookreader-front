import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';

import {
  selectUser,
  selectUserAuthorized,
} from 'src/app/store/features/user.feature';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IUser } from 'src/app/core/services/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user!: IUser;
  public userAuthorized: boolean = false;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private store: Store,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
        this.cd.detectChanges();
      });
    this.store
      .select(selectUserAuthorized)
      .pipe(takeUntil(this.destroy$))
      .subscribe((userAuthorized) => {
        this.userAuthorized = userAuthorized;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public logout(): void {
    this.authService
      .logout()
      .pipe(
        finalize(() => this.router.navigate(['login'])),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
