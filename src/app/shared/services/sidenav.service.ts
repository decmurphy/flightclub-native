import { Injectable } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material';

@Injectable()
export class SidenavService {

  private sidenavs: any;

  constructor() {
    this.sidenavs = {};
  }

  addSidenav(name: string, sidenav: MatSidenav): void {
    this.sidenavs[name] = {
      state: 'open',
      sidenav: sidenav
    };
  }

  toggleNav(name: string): void {
    this.sidenavs[name].sidenav.toggle()
      .then(state => this.sidenavs[name].state = state);
  }

  isOpen(name: string): boolean {
    return this.sidenavs[name] && this.sidenavs[name].state === 'open';
  }

}
