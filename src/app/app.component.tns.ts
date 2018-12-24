import { Component, OnInit } from '@angular/core';
import * as application from 'tns-core-modules/application';
import { RouterExtensions } from 'nativescript-angular/router';
import { isAndroid, isIOS } from 'platform';

@Component({
  selector: 'fc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public constructor(
    private router: RouterExtensions
    ) { }

    public ngOnInit() {

        if (isAndroid) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
                if (this.router.canGoBack()) {
                    args.cancel = true;
                    this.router.back();
                } else {
                    args.cancel = false;
                }
            });
        }
    }

}
