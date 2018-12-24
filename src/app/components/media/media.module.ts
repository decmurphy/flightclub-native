import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SharedModule
} from '@shared/modules';

import { MediaComponent } from './media/media.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MediaComponent
  ]
})
export class MediaModule { }
