import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.component';
import { AddressComponent } from './address.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddressService } from '../../../common/services/local/address.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

const COMPONENTS=[
  AddressesComponent,
  AddressComponent,
  DetailComponent,
  ModifyComponent
]

@NgModule({
  declarations: [...COMPONENTS],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSelectableModule
  ],
  providers:[
    AddressService
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class AddressModule { }
