import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonTypes } from './button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  public type: ButtonTypes = 'button';
  @Input()
  public text: string = 'Button';
  @Input()
  public disabled: boolean = false;
  @Input()
  public loading: boolean = false;

  @Output()
  public onClick: EventEmitter<void> = new EventEmitter<void>();
}
