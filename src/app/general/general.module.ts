import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { GeneralPage } from './general.page';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '../material.module';
import { AvailabilityCheckComponent } from './availability-check/availability-check.component';
import { SharedComponentsModule } from '../common/components/components.module';

const COMPONENTS = [
  AvailabilityCheckComponent,
  IndexComponent,
  GeneralPage
];

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    GeneralPageRoutingModule
  ],
  declarations: [...COMPONENTS]
})
export class GeneralPageModule { }
