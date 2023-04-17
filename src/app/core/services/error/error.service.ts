import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApplicationError } from './application-error';

@Injectable()
export class ErrorService {
  constructor(@Inject(DOCUMENT) private documentRef: Document) {}

  getClientMessage(error: Error | ApplicationError): string {
    if (
      this.documentRef.defaultView &&
      !this.documentRef.defaultView.navigator.onLine
    ) {
      return 'No Internet Connection';
    }

    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error | ApplicationError): string {
    if (error.stack) {
      return error.stack;
    }

    return 'stack';
  }

  getServerMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'A client-side or network error occurred';
    }

    const message = error.error.message && error.message;
    return `${message}. Status code: ${error.status}`;
  }

  getServerStack(error: HttpErrorResponse): string {
    return error.message;
  }
}
