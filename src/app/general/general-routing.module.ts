import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../common/components/error404/error404.component';

import { GeneralPage } from './general.page';
import { IndexComponent } from './index/index.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: "full",
    redirectTo: "/general/index"
  },
  {
    path: '',
    component: GeneralPage,
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: "**",
        component: Error404Component
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
