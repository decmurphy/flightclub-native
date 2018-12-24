
import { Injectable } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Injectable()
export class SidenavService {

  private sidenavs: any;

  constructor() {
    this.sidenavs = {};
  }

  addSidenav(name: string, sidenav: RadSideDrawer): void {
    this.sidenavs[name] = {
      state: 'open',
      sidenav: sidenav
    };
  }

  toggleNav(name: string): void {
    const target = this.sidenavs[name].sidenav;
    target.toggleDrawerState();
    this.sidenavs[name].state = (target.getIsOpen() ? 'open' : 'closed');
  }

  isOpen(name: string): boolean {
    return this.sidenavs[name] && this.sidenavs[name].state === 'open';
  }

}
