import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

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
  IfAndroidDirective,
  IfIosDirective
} from "@shared/directives";

import {
  // ContactModule,
  HomeModule,
  // LiveModule, MediaModule,
  UserModule,
  MenuSidenavComponent,
  // RunSimulationComponent, ErrorComponent,
  ToolbarComponent,
  // PhotographerSettingsDlgComponent, PatronsComponent
} from '@components/index';

@NgModule({
  declarations: [
    AppComponent,

    ToolbarComponent,
    MenuSidenavComponent,

    IfAndroidDirective,
    IfIosDirective
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,

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
