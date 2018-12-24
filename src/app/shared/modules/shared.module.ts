import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { CdkModule } from './cdk.module';

import {
  CesiumComponent
} from '@components/cesium';

import {
  PatreonComponent, // GithubComponent, LinkedinComponent, TwitterComponent,
} from '@components/icons';

import {
  LoadScreenComponent, LoadScreenService
} from '@components/load-screen';

import {
  TrajectoryInfoService
} from '@shared/services';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    CdkModule
  ],
  declarations: [

    CesiumComponent,
    LoadScreenComponent,
/*
    GithubComponent,
    LinkedinComponent,
    */PatreonComponent
    // TwitterComponent
  ],
  providers: [
    LoadScreenService,
    TrajectoryInfoService
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    CdkModule,

    CesiumComponent,
    LoadScreenComponent,
/*
    GithubComponent,
    LinkedinComponent,
    */PatreonComponent
    // TwitterComponent
  ],
})
export class SharedModule { }
