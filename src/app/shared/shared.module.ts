import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { NotifyModalComponent } from './components/notify-modal/notify-modal.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [SvgIconComponent, NotifyModalComponent, ButtonComponent],
  imports: [CommonModule],
  providers: [],
  exports: [SvgIconComponent, NotifyModalComponent, ButtonComponent],
})
export class SharedModule {}
