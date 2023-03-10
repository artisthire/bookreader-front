import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleBtnComponent } from './components/google-btn/google-btn.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [GoogleBtnComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [GoogleBtnComponent, AngularSvgIconModule],
})
export class SharedModule {}
