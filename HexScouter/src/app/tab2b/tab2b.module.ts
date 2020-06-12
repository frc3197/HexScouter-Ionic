import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2bPageRoutingModule } from './tab2b-routing.module';

import { Tab2bPage } from './tab2b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2bPageRoutingModule
  ],
  declarations: [Tab2bPage]
})
export class Tab2bPageModule {}
