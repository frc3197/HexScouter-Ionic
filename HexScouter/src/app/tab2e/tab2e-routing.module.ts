import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2ePage } from './tab2e.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab2bPage } from '../tab2b/tab2b.page';
import { Tab2cPage } from '../tab2c/tab2c.page';
import { Tab2dPage } from '../tab2d/tab2d.page';
import { FormGuardGuard } from '../form-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: Tab2ePage,
    canDeactivate: [FormGuardGuard]
  },
  { path: '/tabs/tab2', component: Tab2Page },
  { path: '/tabs/tab2b', component: Tab2bPage },
  { path: '/tabs/tab2c', component: Tab2cPage },
  { path: '/tabs/tab2d', component: Tab2dPage },
  { path: '/tabs/tab2e', component: Tab2ePage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2ePageRoutingModule {}
