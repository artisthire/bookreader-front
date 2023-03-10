import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleRedirectComponent } from './google-redirect.component';
import { GoogleRedirectRoutingModule } from './google-redirect-routing.module';

@NgModule({
  declarations: [GoogleRedirectComponent],
  imports: [CommonModule, GoogleRedirectRoutingModule],
})
export class GoogleRedirectModule {}
