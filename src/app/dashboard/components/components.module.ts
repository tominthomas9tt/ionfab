import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { AddressComponent } from './address/address.component';
import { BackComponent } from './back/back.component';
import { NotificationsComponent } from './notifications/notifications.component';

const COMPONENTS = [
  AccountMenuComponent,
  AddressComponent,
  BackComponent,
  NotificationsComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class ComponentsModule { }
