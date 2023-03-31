import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private readonly errorService: ErrorService,
    private readonly notificationService: NotificationService
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    let message: string;
    let stackTrace: string;

    if (error instanceof HttpErrorResponse) {
      message = this.errorService.getServerMessage(error);
      stackTrace = this.errorService.getServerStack(error);
    } else {
      message = this.errorService.getClientMessage(error);
      stackTrace = this.errorService.getClientStack(error);
    }

    this.notificationService.showError(message);
    console.log(message, '\n', stackTrace);
  }
}
