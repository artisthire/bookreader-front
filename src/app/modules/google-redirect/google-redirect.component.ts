import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ITokens } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-google-redirect',
  templateUrl: './google-redirect.component.html',
  styleUrls: ['./google-redirect.component.scss'],
})
export class GoogleRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tokens = this.route.snapshot.queryParams as ITokens;
    this.authService.login(tokens);
    this.router.navigate(['']);
  }
}
