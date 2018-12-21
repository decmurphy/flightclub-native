import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { isAndroid, isIOS } from 'platform';

@Component({
  selector: 'fc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
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

}
