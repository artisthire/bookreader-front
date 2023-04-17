import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

interface IRedirectTokens {
  accessToken?: string;
  refreshToken?: string;
}

@Component({
  selector: 'app-google-redirect',
  templateUrl: './google-redirect.component.html',
  styleUrls: ['./google-redirect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const { accessToken, refreshToken } = this.route.snapshot
      .queryParams as IRedirectTokens;

    if (!accessToken || !refreshToken) {
      console.error('Google authentification error.');
      this.router.navigate(['login']);
      return;
    }

    this.authService.saveTokens({
      access: accessToken,
      refresh: refreshToken,
    });
    this.router.navigate(['']);
  }
}
