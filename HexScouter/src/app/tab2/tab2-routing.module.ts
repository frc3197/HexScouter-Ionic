import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { Tab2bPage } from '../tab2b/tab2b.page';
import { Tab2cPage } from '../tab2c/tab2c.page';
import { Tab2dPage } from '../tab2d/tab2d.page';
import { Tab2ePage } from '../tab2e/tab2e.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  { path: 'tab2', component: Tab2Page },
  { path: 'tab2b', component: Tab2bPage },
  { path: 'tab2c', component: Tab2cPage },
  { path: 'tab2d', component: Tab2dPage },
  { path: 'tab2e', component: Tab2ePage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
