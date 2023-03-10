import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleRedirectComponent } from './google-redirect.component';

const routes: Routes = [
  {
    path: '',
    component: GoogleRedirectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleRedirectRoutingModule {}
