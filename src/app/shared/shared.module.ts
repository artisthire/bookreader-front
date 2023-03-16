import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [SvgIconComponent],
  imports: [CommonModule],
  providers: [AuthService],
  exports: [SvgIconComponent],
})
export class SharedModule {}
