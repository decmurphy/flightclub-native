import { Component, OnInit } from '@angular/core';

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
      public sidenavService: SidenavService,
    ) { }

    ngOnInit() { }

  toggleDrawer(): void {
    this.sidenavService.toggleNav('drawer');
  }
}
