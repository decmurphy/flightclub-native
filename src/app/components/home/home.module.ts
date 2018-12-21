import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SharedModule
} from '@shared/modules';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
