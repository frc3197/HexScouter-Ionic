import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2ePage } from './tab2e.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2ePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2ePageRoutingModule {}
