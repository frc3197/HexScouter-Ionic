import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2cPage } from './tab2c.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2cPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2cPageRoutingModule {}
