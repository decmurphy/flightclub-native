import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { UserComponent } from './user/user.component';
import { AccountRootComponent } from './account-root/account-root.component';
import { SavedSimulationsComponent } from './saved-simulations/saved-simulations.component';

@NgModule({
  declarations: [UserComponent, AccountRootComponent, SavedSimulationsComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
