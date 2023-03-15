import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheeseNewPage } from './cheese-new.page';

const routes: Routes = [
  {
    path: '',
    component: CheeseNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheeseNewPageRoutingModule {}
