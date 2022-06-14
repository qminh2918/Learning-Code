import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  // {
  //   path: '',
  //   loadChildren: () => import('../@theme/pages/pages.module')
  //     .then(m => m.PagesModule),
  // },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module')
    .then(m => m.ClientModule),
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./../@theme/pages/login-layout/login-layout.module')
  //     .then(m => m.LoginLayoutModule),
  // },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
