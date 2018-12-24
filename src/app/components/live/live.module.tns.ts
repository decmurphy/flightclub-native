import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { LiveComponent } from './live/live.component';
import { LiveSidenavComponent } from './live-sidenav/live-sidenav.component';

@NgModule({
  declarations: [LiveComponent, LiveSidenavComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LiveModule { }
