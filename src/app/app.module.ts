import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
  MenuSidenavComponent,
  // RunSimulationComponent, ErrorComponent,
  ToolbarComponent
  // PhotographerSettingsDlgComponent, PatronsComponent
} from '@components/index';

@NgModule({
  declarations: [
    AppComponent,

    MenuSidenavComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

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
    UtilityService,
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
