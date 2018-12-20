import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavService, PatreonService } from '@shared/services';
import { UserService } from '@components/user';

@Component({
  selector: 'fc-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public router: Router,
    public userService: UserService,
    public patreonService: PatreonService,
    private sidenavService: SidenavService
  ) { }

  ngOnInit(): void {
  }

  redirectTo(target: string): void {
    window.open(target);
  }

  toggleNav(id: string): void {
    this.sidenavService.toggleNav(id);
  }

}
