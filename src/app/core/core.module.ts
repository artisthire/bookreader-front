import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {
  AuthenticationInterceptor,
  API_URL,
} from './services/authentication-interceptor';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    { provide: API_URL, useValue: environment.apiUrl },
    UserService,
    AuthService,
  ],
  exports: [],
})
export class CoreModule {}
