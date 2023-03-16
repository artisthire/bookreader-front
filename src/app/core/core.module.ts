import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthenticationInterceptor } from './http-interceptors/authentication-interceptor';
import { API_URL } from './injection-tokens/injection-tokens';

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
  ],
  exports: [],
})
export class CoreModule {}
