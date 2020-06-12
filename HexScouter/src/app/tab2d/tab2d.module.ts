import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2dPageRoutingModule } from './tab2d-routing.module';

import { Tab2dPage } from './tab2d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2dPageRoutingModule
  ],
  declarations: [Tab2dPage]
})
export class Tab2dPageModule {}
