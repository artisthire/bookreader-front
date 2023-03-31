import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input()
  data!: INotifyModalData;

  constructor(private modalService: ModalService) {}

  public onClick(): void {
    this.modalService.close();
  }
}
