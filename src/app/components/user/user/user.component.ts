import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Event, Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { filter, startWith } from 'rxjs/operators';

import { UserService } from '../user.service';
import { CoreService, SidenavService } from '@shared/services';

@Component({
  selector: 'fc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('accountSidenav') public accountSidenav: MatSidenav;

  watcher: any;
  opened: boolean;
  mode: string;

  accountRoute: string;

  constructor(
    private media: ObservableMedia,
    private sidenavService: SidenavService,
    private coreService: CoreService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
      // ObservableMedia only fires on page load if xs or sm. Initialise values here for gt-sm
      // https://github.com/angular/flex-layout/issues/426
      this.opened = true;
      this.mode = 'side';
      this.watcher = media.subscribe((change: MediaChange) => {
          if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
              this.opened = false;
              this.mode = 'over';
          } else {
              this.opened = true;
              this.mode = 'side';
          }
      });
    }

  ngOnInit() {

    this.route.fragment.subscribe((fragment: string) => {
      if (fragment) {
        this.coreService.setAccessToken(fragment);
        this.location.replaceState(this.location.path(false));
        this.userService.getUser();
      }
    });

    this.sidenavService.addSidenav('accountSidenav', this.accountSidenav);

    this.accountRoute = this.router.url;
    this.router.events
        .pipe(filter((event: Event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => { this.accountRoute = event.url; });
  }

  hasRole(role: string): boolean {
    return this.userService.hasRole(role);
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout()
      .then(res => this.navigate(['/']));
  }

  navigate(routeArray: string[], options?: any): void {
    this.router.navigate(routeArray, options);
    if (this.media.isActive('xs') || this.media.isActive('sm')) {
      this.toggleNav('accountSidenav');
    }
  }

  toggleNav(id: string): void {
      this.sidenavService.toggleNav(id);
  }

  routeMatches(route: string): boolean {
      return this.accountRoute.startsWith('/account/' + route);
  }

}
