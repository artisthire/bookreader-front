import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser, UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userObservabler$!: Subscription;
  public user: IUser | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userObservabler$ = this.userService.userData$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userObservabler$.unsubscribe();
  }

  public logout(): void {
    this.authService
      .logout()
      .pipe(finalize(() => this.router.navigate(['login'])))
      .subscribe();
  }
}
