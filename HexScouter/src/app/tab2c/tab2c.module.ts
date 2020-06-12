import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2cPageRoutingModule } from './tab2c-routing.module';

import { Tab2cPage } from './tab2c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2cPageRoutingModule
  ],
  declarations: [Tab2cPage]
})
export class Tab2cPageModule {}
