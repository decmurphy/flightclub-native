import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from '@components/home/home.module';
import { UserModule } from '@components/user/user.module';

import {
    SharedModule
} from '@shared/modules';

import {
  // AuthInterceptor,
  CoreService,
  // MailService,
  PatreonService,
  // SidenavService,
  UtilityService
} from '@shared/services';

import {
  // ContactModule, HomeModule, LiveModule, MediaModule, UserModule,
  // MenuSidenavComponent, RunSimulationComponent, ToolbarComponent, PhotographerSettingsDlgComponent, PatronsComponent
} from '@components/load-screen';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    SharedModule,

    HomeModule,
    UserModule
  ],
  providers: [
    CoreService,
    PatreonService,
    UtilityService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
