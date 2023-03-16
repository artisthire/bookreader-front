import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleRedirectComponent } from './google-redirect.component';
import { GoogleRedirectRoutingModule } from './google-redirect-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GoogleRedirectComponent],
  imports: [CommonModule, GoogleRedirectRoutingModule, SharedModule],
})
export class GoogleRedirectModule {}
