import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheesesListPage } from './cheeses-list.page';

const routes: Routes = [
  {
    path: '',
    component: CheesesListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./cheese-new/cheese-new.module').then( m => m.CheeseNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./cheese/cheese.module').then( m => m.CheesePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheesesListPageRoutingModule {}
