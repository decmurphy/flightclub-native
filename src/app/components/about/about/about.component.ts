import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import {
  SidenavService, UtilityService
} from '@shared/services';

@Component({
  selector: 'fc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // @ViewChild('contactForm') public contactForm: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    // this.sidenavService.addSidenav('contactForm', this.contactForm);
  }

  navigateTo(url: string, target?: string): void {
    this.utilityService.navigateTo(url, target);
  }

  public toggleNav(id: string): void {
    this.sidenavService.toggleNav(id);
  }

}
