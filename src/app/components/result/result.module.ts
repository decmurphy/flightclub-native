import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result/result.component';
import { ResultService } from './result.service';

import { TwoDimVisualisationComponent } from './two-dim-visualisation/two-dim-visualisation.component';
import { ThreeDimVisualisationComponent } from './three-dim-visualisation/three-dim-visualisation.component';
import { TelemetryComponent } from './telemetry/telemetry.component';

import {
  LocalStorageService, SessionStorageService, PlotlyService,
  SharedModule
} from '@shared/index';

@NgModule({
  declarations: [
    ResultComponent,
    TwoDimVisualisationComponent,
    ThreeDimVisualisationComponent,
    TelemetryComponent
  ],
  providers: [
    ResultService,
    LocalStorageService,
    PlotlyService,
    SessionStorageService,
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    SharedModule
  ]
})
export class ResultModule { }
