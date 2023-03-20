import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from './components/svg-icon/svg-icon.component';

@NgModule({
  declarations: [SvgIconComponent],
  imports: [CommonModule],
  providers: [],
  exports: [SvgIconComponent],
})
export class SharedModule {}
