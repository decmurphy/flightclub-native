import { Routes } from '@angular/router';

import {
  // ContactComponent, ErrorComponent,
  HomeComponent,
  // LiveComponent, RunSimulationComponent, MediaComponent, PatronsComponent
} from '@components/index';

export const routes: Routes = [
  { path: '', component: HomeComponent }
  /*{ path: 'about', component: ContactComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'live', component: LiveComponent },
  { path: 'run-simulation', component: RunSimulationComponent },
  { path: 'media', component: MediaComponent },
  { path: 'patrons', component: PatronsComponent }*/
];
