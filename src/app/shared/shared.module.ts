import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [SvgIconComponent, ButtonComponent],
  imports: [CommonModule],
  providers: [],
  exports: [SvgIconComponent, ButtonComponent],
})
export class SharedModule {}
