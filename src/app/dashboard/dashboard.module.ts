import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ServicesComponent } from './services/services.component';
import { CategorySliderComponent } from './category-slider/category-slider.component';
import { VendorCardComponent } from './components/vendor-card/vendor-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from '../material.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { AddressModule } from './components/address/address.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { HeaderComponent } from './header/header.component';
import { NewjobComponent } from './components/newjob/newjob.component';
import { SharedPipesModule } from '../common/shared-pipes/shared-pipes.module';

const COMPONENTS = [
  AccountMenuComponent,
  CategorySliderComponent,
  DashboardPage,
  FilterComponent,
  HomeComponent,
  HeaderComponent,
  NewjobComponent,
  NotificationsComponent,
  ProfileComponent,
  ServicesComponent,
  VendorCardComponent,
  WelcomeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    AddressModule,
    SharedPipesModule,
    RouterModule,
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
