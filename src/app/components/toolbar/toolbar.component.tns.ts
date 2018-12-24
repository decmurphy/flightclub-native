import { Component, OnInit } from '@angular/core';

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

  constructor(
    public sidenavService: SidenavService
  ) { }

  ngOnInit(): void {
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
