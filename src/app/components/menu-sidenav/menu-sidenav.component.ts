import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

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

  @ViewChild('menu') public menu: MatSidenav;

  watcher: any;
  fixedTopGap: number;

  constructor(
    private media: ObservableMedia,
    public sidenavService: SidenavService,
    public userService: UserService,
    public patreonService: PatreonService
  ) {
      // ObservableMedia only fires on page load if xs or sm. Initialise values here for gt-sm
      // https://github.com/angular/flex-layout/issues/426
      this.fixedTopGap = 64;
      this.watcher = media.subscribe((change: MediaChange) => {
          this.fixedTopGap = change.mqAlias === 'xs' ? 56 : 64;
      });
  }

  ngOnInit() {
    this.sidenavService.addSidenav('menu', this.menu);
  }

  hasRole(role: string): boolean {
    return this.userService.hasRole(role);
}

}
