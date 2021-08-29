import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsPageRoutingModule } from './jobs-routing.module';

import { JobsPage } from './jobs.page';
import { MaterialModule } from 'src/app/material.module';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { SharedPipesModule } from 'src/app/common/shared-pipes/shared-pipes.module';
import { QuotationComponent } from './components/quotation/quotation.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { BackComponent } from '../../components/back/back.component';
import { ComponentsModule } from '../../components/components.module';
import { SharedComponentsModule } from 'src/app/common/components/components.module';

const COMPONENTS = [
  HomeComponent,
  DetailsComponent,
  JobsPage,
  QuotationComponent,
  VendorComponent
];

@NgModule({
  imports: [
    SharedComponentsModule,
    CommonModule,
    ComponentsModule,
    SharedPipesModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
    JobsPageRoutingModule
  ],
  declarations: [...COMPONENTS]
})
export class JobsPageModule { }
