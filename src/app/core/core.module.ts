import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {
  AuthenticationInterceptor,
  API_URL,
} from './services/interceptors/authentication-interceptor';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { ModalService } from './services/modal/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import { ErrorService } from './services/error/error.service';
import { NotificationService } from './services/notification/notification.service';
import { GlobalErrorHandler } from './services/error-handler/global-error.handler';

@NgModule({
  declarations: [ModalComponent],
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
    ModalService,
    ErrorService,
    NotificationService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  exports: [ModalComponent],
})
export class CoreModule {}
