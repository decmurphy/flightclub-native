import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { View } from 'ui/core/view';
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

  @ViewChild('actionItemIcon') actionItemIcon: ElementRef;
  isRoot: boolean;
  viewInit = false;
  hamburgerIcon = String.fromCharCode(0xf0c9);
  backIcon = String.fromCharCode(0xf053);
  text = this.hamburgerIcon;

  rootScale = 1;
  rootOpacity = 1;
  rootRotation = 0;

  constructor(
    private page: Page,
    private router: Router,
    private routerExtensions: RouterExtensions,
    public sidenavService: SidenavService
  ) { }

  ngOnInit(): void {

    this.page.on('loaded', () => {
      this.viewInit = true;
    });

    this.router.events
        .pipe(filter((event: Event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.isRoot = event.url === '/';
          this.animateHamburger();
        });
  }

  isAndroid(): boolean {
      return isAndroid === true;
  }

  isIOS(): boolean {
      return isIOS === true;
  }

  onIosTap(): void {
    if (this.isRoot) {
      this.toggleDrawer();
    } else {
      this.goBack();
    }
  }

  toggleDrawer(): void {
    this.sidenavService.toggleNav('drawer');
  }

  goBack(): void {
    this.routerExtensions.back();
  }

  animateHamburger(): void {

    if (isAndroid || !this.viewInit) {
      return;
    }

    if (this.isRoot === (this.text === this.hamburgerIcon)) {
      return;
    }

    const view = <View>this.actionItemIcon.nativeElement;
    view.animate({ rotate: 180, duration: 150 })
      .then(() => this.text = this.isRoot ? this.hamburgerIcon : this.backIcon)
      .then(() => view.animate({ rotate: 360, duration: 150 }));

  }

}
