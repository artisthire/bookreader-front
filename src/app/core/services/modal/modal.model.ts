import { Type } from '@angular/core';

export interface IModal<T> {
  data: T;
}

export interface IModalData<T> extends IModal<T> {
  component: Type<any>;
}
