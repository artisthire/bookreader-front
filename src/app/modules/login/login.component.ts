import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public quote: string =
    'Books are the ships of thoughts, wandering through the waves of time.';
  public quoteAuthor: string = 'Francis Bacon';
}
