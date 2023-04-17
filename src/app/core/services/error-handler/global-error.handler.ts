import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';
import { ApplicationError } from '../error/application-error';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private readonly errorService: ErrorService,
    private readonly notificationService: NotificationService
  ) {}

  handleError(error: Error | ApplicationError | HttpErrorResponse) {
    let message: string;
    let stackTrace: string;

    if (error instanceof HttpErrorResponse) {
      message = this.errorService.getServerMessage(error);
      stackTrace = this.errorService.getServerStack(error);
    } else {
      message = this.errorService.getClientMessage(error);
      stackTrace = this.errorService.getClientStack(error);
    }

    if (
      error instanceof HttpErrorResponse ||
      error instanceof ApplicationError
    ) {
      this.notificationService.showError(message);
      console.error(message, '\n', stackTrace);
      return;
    }

    throw error;
  }
}
