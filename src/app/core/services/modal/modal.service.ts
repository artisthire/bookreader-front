import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IModalData } from './modal.model';

@Injectable()
export class ModalService {
  private modalSubject$ = new Subject<IModalData | null>();
  public modalObservable$ = this.modalSubject$.asObservable();

  public open(data: IModalData): void {
    this.modalSubject$.next(data);
  }

  public close(): void {
    this.modalSubject$.next(null);
  }
}
