import { Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AccountRootComponent } from './account-root/account-root.component';
import { SavedSimulationsComponent } from './saved-simulations/saved-simulations.component';

export const routes: Routes = [
  {
    path: 'account', component: UserComponent,
    children: [
      { path: '', component: AccountRootComponent },
      { path: 'saved-simulations', component: SavedSimulationsComponent }
    ]
  },
];
