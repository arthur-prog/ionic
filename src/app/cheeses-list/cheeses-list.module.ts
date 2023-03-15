import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheesesListPageRoutingModule } from './cheeses-list-routing.module';

import { CheesesListPage } from './cheeses-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheesesListPageRoutingModule
  ],
  declarations: [CheesesListPage]
})
export class CheesesListPageModule {}
