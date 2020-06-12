import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2dPage } from './tab2d.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2dPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2dPageRoutingModule {}
