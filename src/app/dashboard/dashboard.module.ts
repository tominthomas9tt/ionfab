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

const COMPONENTS = [
  BusinessComponent,
  DashboardPage,
  HomeComponent,
  HeaderComponent,
  ProfileComponent,
  ServicesComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardPageRoutingModule,
    IonicModule
  ],
  providers: [],
  declarations: [...COMPONENTS]
})
export class DashboardPageModule { }
