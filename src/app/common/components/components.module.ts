import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [
  LoadingComponent,
  ButtonLoadingComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [...COMPONENTS]
})
export class SharedComponentsModule { }
