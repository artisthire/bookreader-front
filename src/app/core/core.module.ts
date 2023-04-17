import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from './../../environments/environment';
import {
  AuthenticationInterceptor,
  API_URL,
} from './services/interceptors/authentication-interceptor';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { ModalService } from './services/modal/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import { NotifyModalComponent } from './components/notify-modal/notify-modal.component';
import { ErrorService } from './services/error/error.service';
import { NotificationService } from './services/notification/notification.service';
import { GlobalErrorHandler } from './services/error-handler/global-error.handler';
import { HeaderComponent } from './components/header/header.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    ModalComponent,
    NotifyModalComponent,
    HeaderComponent,
    ProgressBarComponent,
  ],
  imports: [CommonModule, SharedModule],
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
  exports: [
    ModalComponent,
    NotifyModalComponent,
    HeaderComponent,
    ProgressBarComponent,
  ],
})
export class CoreModule {}
