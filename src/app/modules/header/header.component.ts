import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';

import { selectUser } from 'src/app/store/selectors/user.selectors';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ILoginUser } from 'src/app/core/services/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription!: Subscription;
  public user!: ILoginUser;

  constructor(
    private router: Router,
    private store: Store,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public logout(): void {
    this.authService
      .logout()
      .pipe(finalize(() => this.router.navigate(['login'])))
      .subscribe();
  }
}
