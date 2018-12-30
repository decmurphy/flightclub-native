import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '@shared/modules';

import { UserComponent } from './user/user.component';
import { AccountRootComponent } from './account-root/account-root.component';
import { SavedSimulationsComponent } from './saved-simulations/saved-simulations.component';

import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    AccountRootComponent,
    SavedSimulationsComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
