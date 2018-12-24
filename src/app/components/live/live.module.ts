import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  SharedModule
} from '@shared/modules';

import { LiveComponent } from './live/live.component';
import { LiveSidenavComponent } from './live-sidenav/live-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    LiveComponent,
    LiveSidenavComponent
  ]
})
export class LiveModule { }
