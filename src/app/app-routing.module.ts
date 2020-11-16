import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AnonymousGuard } from './@core/auth/anonymous.guard';
import { AuthGuard } from './@core/auth/auth.guard';

export const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    canActivate: [AnonymousGuard],
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-layout.module').then((m) => m.AuthLayoutModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
