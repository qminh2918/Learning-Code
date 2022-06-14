import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: MenuComponent,
  //   children: [
  //     { path: 'lap-bao-cao', children: lapBaoCaoRoutes },
  //     { path: 'lich-su-tong-hop', children: lichSuRoutes },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
