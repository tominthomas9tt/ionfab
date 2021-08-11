import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { BackComponent } from './back/back.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { AddressModule } from './address/address.module';
import { AddressComponent } from './address/address.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  AccountMenuComponent,
  BackComponent,
  NotificationsComponent,
  SearchComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule
  ],
  exports: [...COMPONENTS]
})
export class ComponentsModule { }
