import { Injectable } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { NotifyModalComponent } from 'src/app/shared/components/notify-modal/notify-modal.component';
import { INotifyModalData } from 'src/app/shared/components/notify-modal/notify-modal.model';

@Injectable()
export class NotificationService {
  constructor(private readonly modalService: ModalService) {}

  showError(message: string): void {
    this.modalService.open<INotifyModalData>({
      component: NotifyModalComponent,
      data: { title: 'Application error', text: message },
    });
  }
}
