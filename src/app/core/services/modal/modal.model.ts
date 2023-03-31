import { Type } from '@angular/core';

export interface IModal<T> {
  data: T;
}

export interface IModalData extends IModal<any> {
  component: Type<any>;
}
