import { NgModule } from '@angular/core';

import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';

@NgModule({
  exports: [
    ObserversModule,
    PlatformModule
  ],
})
export class CdkModule { }
