import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheesePageRoutingModule } from './cheese-routing.module';

import { CheesePage } from './cheese.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheesePageRoutingModule
  ],
  declarations: [CheesePage]
})
export class CheesePageModule {}
