import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { GeneralPage } from './general.page';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '../material.module';

const COMPONENTS = [
  IndexComponent,
  GeneralPage
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    GeneralPageRoutingModule
  ],
  declarations: [...COMPONENTS]
})
export class GeneralPageModule { }
