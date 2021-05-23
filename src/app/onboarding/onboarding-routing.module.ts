import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../common/components/error404/error404.component';
import { InprogressComponent } from './inprogress/inprogress.component';

import { OnboardingPage } from './onboarding.page';
import { StarterComponent } from './starter/starter.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "/onboarding/start"
  },
  {
    path: '',
    component: OnboardingPage,
    children: [ 
      {
        path: 'start',
        component: StarterComponent
      },
      {
        path:'verification-status',
        component:InprogressComponent
      },
      {
        path:"**",
        component:Error404Component
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {}
