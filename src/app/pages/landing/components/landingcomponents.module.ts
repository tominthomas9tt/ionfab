import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BannerSliderComponent } from './banner-slider/banner-slider.component';
import { FooterComponent } from './footer/footer.component';
import { AssociateAgreementComponent } from './associate-agreement/associate-agreement.component';
import { CustomerTermsComponent } from './customer-terms/customer-terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ServicesComponent } from './services/services.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PartnerComponent } from './partner/partner.component';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { LandingSearchServiceComponent } from './landing-search-service/landing-search-service.component';
import { SharedComponentsModule } from 'src/app/common/components/components.module';

const COMPONENTS = [
  AssociateAgreementComponent,
  BannerSliderComponent,
  CustomerMenuComponent,
  CustomerTermsComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  LandingSearchServiceComponent,
  PartnerComponent,
  PrivacyPolicyComponent,
  ServicesComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedComponentsModule,
    RouterModule,
    IonicModule,
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class LandingComponentsModule { }
