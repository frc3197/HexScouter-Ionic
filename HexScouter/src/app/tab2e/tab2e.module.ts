import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2ePageRoutingModule } from './tab2e-routing.module';

import { Tab2ePage } from './tab2e.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2ePageRoutingModule
  ],
  declarations: [Tab2ePage]
})
export class Tab2ePageModule {}
