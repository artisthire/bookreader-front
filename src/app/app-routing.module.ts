import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'google-redirect',
    loadChildren: () =>
      import('./modules/google-redirect/google-redirect.module').then(
        (m) => m.GoogleRedirectModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/library/library.module').then((m) => m.LibraryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
