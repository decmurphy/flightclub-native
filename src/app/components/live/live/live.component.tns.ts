import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

import {
  SidenavService
} from '@shared/services';

@Component({
  selector: 'fc-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

    constructor(
      private page: Page,
      public sidenavService: SidenavService,
    ) { }

    ngOnInit() {
      this.page.actionBarHidden = true;
    }

  toggleDrawer(): void {
    this.sidenavService.toggleNav('drawer');
  }
}
