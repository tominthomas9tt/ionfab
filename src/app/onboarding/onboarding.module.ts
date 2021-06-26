import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { StarterComponent } from './starter/starter.component';
import { MaterialModule } from '../material.module';
import { BusinessbasicsComponent } from './businessbasics/businessbasics.component';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { AddressdetailsComponent } from './addressdetails/addressdetails.component';
import { ServicedetailsComponent } from './servicedetails/servicedetails.component';
import { PaymentComponent } from './payment/payment.component';
import { InprogressComponent } from './inprogress/inprogress.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { ServiceaddmodalComponent } from './serviceaddmodal/serviceaddmodal.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { StepsComponent } from './steps/steps.component';

const COMPONENTS = [
  OnboardingPage,
  StarterComponent,
  BusinessbasicsComponent,
  ContactdetailsComponent,
  AddressdetailsComponent,
  ServicedetailsComponent,
  PaymentComponent,
  InprogressComponent,
  VerifyemailComponent,
  ServiceaddmodalComponent,
  StepsComponent,
  TermsandconditionsComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
    IonicSelectableModule,
    OnboardingPageRoutingModule
  ],
  declarations: [...COMPONENTS]
})
export class OnboardingPageModule { }
