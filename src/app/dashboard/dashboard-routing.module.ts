import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

import { Error404Component } from '../common/components/error404/error404.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BusinessComponent } from './business/business.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: "full",
    redirectTo: "/dashboard/home"
  },
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'business',
        component: BusinessComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'services',
        component: ServicesComponent
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
export class DashboardPageRoutingModule { }
