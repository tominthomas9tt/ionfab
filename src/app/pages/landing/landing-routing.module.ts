import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateAgreementComponent } from './components/associate-agreement/associate-agreement.component';
import { CustomerTermsComponent } from './components/customer-terms/customer-terms.component';
import { HomeComponent } from './components/home/home.component';
import { PartnerComponent } from './components/partner/partner.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ServicesComponent } from './components/services/services.component';

import { LandingPage } from './landing.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'partner',
        component: PartnerComponent
      },
      {
        path: 'associate-agreement',
        component: AssociateAgreementComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'terms-and-conditions',
        component: CustomerTermsComponent
      },
      {
        path: 'services/:id',
        component: ServicesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule { }
