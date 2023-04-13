import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

interface IRedirectTokens {
  accessToken: string;
  refreshToken: string;
}

@Component({
  selector: 'app-google-redirect',
  templateUrl: './google-redirect.component.html',
  styleUrls: ['./google-redirect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleRedirectComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const { accessToken, refreshToken } = this.route.snapshot
      .queryParams as IRedirectTokens;
    if (!accessToken || !refreshToken) {
      throw Error('Google authentification error.');
    }

    this.authService.saveTokens({
      access: accessToken,
      refresh: refreshToken,
    });
    this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
