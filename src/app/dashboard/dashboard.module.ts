import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { httpInterceptorProviders } from '../common/http-interceptors';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { BusinessComponent } from './business/business.component';
import { ServicesComponent } from './services/services.component';
import { CategorySliderComponent } from './category-slider/category-slider.component';
import { VendorCardComponent } from './components/vendor-card/vendor-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { HideHeaderDirective } from '../directives/hide-header.directive';
import { MaterialModule } from '../material.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { AddressModule } from './components/address/address.module';

const COMPONENTS = [
  BusinessComponent,
  CategorySliderComponent,
  DashboardPage,
  FilterComponent,
  HomeComponent,
  HeaderComponent,
  ProfileComponent,
  ServicesComponent,
  VendorCardComponent,
  HideHeaderDirective
]

@NgModule({
  imports: [
    CommonModule,
    AddressModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    DashboardPageRoutingModule,
    IonicModule
  ],
  providers: [],
  declarations: [...COMPONENTS]
})
export class DashboardPageModule { }
