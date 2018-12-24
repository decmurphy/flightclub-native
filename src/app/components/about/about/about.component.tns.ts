import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import * as utilsModule from 'tns-core-modules/utils/utils';

@Component({
  selector: 'fc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
      private page: Page
  ) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
  }

  externalRedirect(url: string) {
    console.log('redirect to' + url);
    utilsModule.openUrl(url);
  }

}
