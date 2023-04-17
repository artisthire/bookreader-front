import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { authGuard } from './core/services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'google-redirect',
    loadChildren: () =>
      import('./modules/google-redirect/google-redirect.module').then(
        (m) => m.GoogleRedirectModule
      ),
  },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/library/library.module').then(
            (m) => m.LibraryModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
