import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { MediaComponent } from './media/media.component';

@NgModule({
  declarations: [MediaComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIListViewModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MediaModule { }
