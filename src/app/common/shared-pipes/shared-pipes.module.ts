import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiancurrencyPipe } from './indiancurrency.pipe';

const PIPES=[
  IndiancurrencyPipe
]


@NgModule({
  declarations: [...PIPES],
  imports: [
    CommonModule
  ],
  exports:[...PIPES]
})
export class SharedPipesModule { }
