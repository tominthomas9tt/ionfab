import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from 'src/app/common/components/error404/error404.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

import { JobsPage } from './jobs.page';

const routes: Routes = [
  {
    path: '',
    component: JobsPage,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':id',
        component: DetailsComponent
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
export class JobsPageRoutingModule { }
