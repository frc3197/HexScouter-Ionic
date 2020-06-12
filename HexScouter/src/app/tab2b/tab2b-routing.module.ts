import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2bPage } from './tab2b.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2bPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2bPageRoutingModule {}
