import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '@shared/modules';

import { UserComponent } from './user/user.component';
import { AccountRootComponent } from './account-root/account-root.component';
import { SavedSimulationsComponent } from './saved-simulations/saved-simulations.component';

import { UserService } from './user.service';

@NgModule({
  declarations: [
    UserComponent,
    AccountRootComponent,
    SavedSimulationsComponent
  ],
  imports: [
    NativeScriptCommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [
    UserService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
