import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheeseNewPageRoutingModule } from './cheese-new-routing.module';

import { CheeseNewPage } from './cheese-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheeseNewPageRoutingModule
  ],
  declarations: [CheeseNewPage]
})
export class CheeseNewPageModule {}
