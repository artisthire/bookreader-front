import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { IModal } from 'src/app/core/services/modal/modal.model';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { INotifyModalData } from './notify-modal.model';

@Component({
  selector: 'app-notify-modal',
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyModalComponent implements IModal<INotifyModalData> {
  public _data!: INotifyModalData;
  set data(data: INotifyModalData) {
    this._data = data;
    this.cd.detectChanges();
  }

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly modalService: ModalService
  ) {}

  public onClick(): void {
    this.modalService.close();
  }
}
