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
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NewjobComponent } from './components/newjob/newjob.component';
import { SharedPipesModule } from '../common/shared-pipes/shared-pipes.module';
import { ComponentsModule } from './components/components.module';

const COMPONENTS = [
  CategorySliderComponent,
  DashboardPage,
  FilterComponent,
  HomeComponent,
  HeaderComponent,
  NewjobComponent,
  ProfileComponent,
  ServicesComponent,
  VendorCardComponent,
  WelcomeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    AddressModule,
    ComponentsModule,
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
