import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { AboutComponent } from './about/about.component';

import {
  SharedModule
} from '@shared/modules';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    NativeScriptCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AboutModule { }
