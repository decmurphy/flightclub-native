import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterExtensions } from 'nativescript-angular/router';
import { isAndroid, isIOS } from 'platform';

import {
  SidenavService
} from '@shared/services';

@Component({
  selector: 'fc-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isRoot: boolean;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    public sidenavService: SidenavService
  ) { }

  ngOnInit(): void {
    this.router.events
        .pipe(filter((event: Event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this.isRoot = event.url === '/');
  }

  isAndroid(): boolean {
      return isAndroid === true;
  }

  isIOS(): boolean {
      return isIOS === true;
  }

  toggleDrawer(): void {
    this.sidenavService.toggleNav('drawer');
  }

  goBack(): void {
    this.routerExtensions.back();
  }

}
