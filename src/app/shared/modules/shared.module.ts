import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { CdkModule } from './cdk.module';
/*
import {
  CesiumComponent
} from '@components/cesium';

import {
  GithubComponent, LinkedinComponent, PatreonComponent, TwitterComponent,
} from '@components/icons';

import {
  LiveSidenavComponent
} from '@components/live/live-sidenav/live-sidenav.component';
*/
import {
  LoadScreenComponent, LoadScreenService
} from '@components/load-screen';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    CdkModule
  ],
  declarations: [
    /*
    CesiumComponent,
    LiveSidenavComponent,
    */LoadScreenComponent,
/*
    GithubComponent,
    LinkedinComponent,
    PatreonComponent,
    TwitterComponent
    */
  ],
  providers: [
    LoadScreenService
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    CdkModule,
/*
    CesiumComponent,

    LiveSidenavComponent,
*/
    LoadScreenComponent,
/*
    GithubComponent,
    LinkedinComponent,
    PatreonComponent,
    TwitterComponent
    */
  ],
})
export class SharedModule { }
