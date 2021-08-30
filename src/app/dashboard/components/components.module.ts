import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { BackComponent } from './back/back.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RatingComponent } from './rating/rating.component';

const COMPONENTS = [
  AccountMenuComponent,
  BackComponent,
  NotificationsComponent,
  RatingComponent,
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
