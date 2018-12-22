import { Component, ViewChild, OnInit } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';

import {
  UserService
} from '@components/user';

import {
  SidenavService, PatreonService
} from '@shared/services';

@Component({
  selector: 'fc-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

  constructor(
    public sidenavService: SidenavService,
    public userService: UserService,
    public patreonService: PatreonService
  ) {
  }

  ngOnInit() {
    this.sidenavService.addSidenav('drawer', this.drawerComponent.sideDrawer);
  }

  hasRole(role: string): boolean {
    return this.userService.hasRole(role);
  }

}
