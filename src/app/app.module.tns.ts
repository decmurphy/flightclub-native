import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  SharedModule
} from '@shared/modules';

import {
  AuthInterceptor,
  CoreService,
  LocalStorageService,
  // MailService,
  PatreonService,
  SidenavService,
  UtilityService
} from '@shared/services';

import {
  // ContactModule,
  HomeModule,
  // LiveModule, MediaModule,
  UserModule,
  // MenuSidenavComponent, RunSimulationComponent, ErrorComponent,
  ToolbarComponent,
  // PhotographerSettingsDlgComponent, PatronsComponent
} from '@components/index';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';

@NgModule({
  declarations: [
    AppComponent,

    ToolbarComponent,

    MenuSidenavComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,

    AppRoutingModule,
    SharedModule,

    HomeModule,
    UserModule
  ],
  providers: [
    CoreService,
    LocalStorageService,
    PatreonService,
    SidenavService,
    UtilityService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
