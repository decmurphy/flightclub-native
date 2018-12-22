import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { isAndroid, isIOS } from 'platform';

import {
  SidenavService
} from '@shared/services';

@Component({
  selector: 'fc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sidenavService: SidenavService,
  ) { }

  ngOnInit() {
  }

  routeTo(target: string): void {
    this.router.navigateByUrl(target);
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

}
