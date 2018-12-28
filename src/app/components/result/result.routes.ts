import { Routes } from '@angular/router';

import { ResultComponent } from './result/result.component';
import { TwoDimVisualisationComponent } from './two-dim-visualisation/two-dim-visualisation.component';
import { ThreeDimVisualisationComponent } from './three-dim-visualisation/three-dim-visualisation.component';
import { TelemetryComponent } from './telemetry/telemetry.component';

export const routes: Routes = [
  {
    path: 'result', component: ResultComponent,
    children: [
      { path: '', redirectTo: '2d', pathMatch: 'full' },
      { path: '2d', component: TwoDimVisualisationComponent },
      { path: '3d', component: ThreeDimVisualisationComponent },
      { path: 'telemetry', component: TelemetryComponent },
    ]
  },
];
