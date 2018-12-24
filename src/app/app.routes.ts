import { Routes } from '@angular/router';

import {
  // ErrorComponent,
  AboutComponent, HomeComponent, LiveComponent, MediaComponent
  // RunSimulationComponent, PatronsComponent
} from '@components/index';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'error', component: ErrorComponent }
  { path: 'live', component: LiveComponent },
  /*{ path: 'run-simulation', component: RunSimulationComponent },
  */{ path: 'media', component: MediaComponent },
  // { path: 'patrons', component: PatronsComponent }*/
];
