import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
export class GoogleRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tokens = this.route.snapshot.queryParams as IRedirectTokens;
    this.authService.saveTokens({
      access: tokens.accessToken,
      refresh: tokens.refreshToken,
    });
    this.router.navigate(['']);
  }
}
