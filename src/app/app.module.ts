import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
