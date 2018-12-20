import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';

import { Messages } from '@shared/interfaces';

@Injectable()
export class LoadScreenService {

  _loading: boolean;
  _loadingMessage: string;
  page: string;
  messages: Messages;
  geoPatrons: any[];

  constructor(
      private http: HttpClient
  ) {
        this._loading = false;
        this._loadingMessage = '';

        this.http.get('/assets/load-screen.messages.json').toPromise()
            .then((json: any) => {
                this.messages = json.messages;
                if (this.geoPatrons) {
                    this.addPatronsToLoadScreen(this.geoPatrons);
                }
            });

    }

    addPatronsToLoadScreen(geoPatrons: any[]) {
        if (this.messages) {
            Object.keys(this.messages).forEach(key => {
                this.messages[key].unshift({
                    'p': 0.95,
                    'message': 'A huge thank you to my GEO Patrons for supporting Flight Club!'
                        + '<ul><li>' + geoPatrons.join('</li><li>') + '</li></ul>'
                        + '<a href=\'https://www.patreon.com/flightclub\' target=\'_blank\'>Click here to support me on Patreon!</a>'
                });
            });
        } else {
            this.geoPatrons = geoPatrons;
        }
    }

  getLoadingMessage(): string {
      if (!this._loading) {
          this.initiateRoller(this.page);
      }
      return this._loadingMessage;
  }

  initiateRoller(page): void {

      if (this.messages === undefined) {
          this.page = page;
          return;
      }

      const messageArray = this.messages[page] || this.messages['build'];
      let i = 0;
      this._loadingMessage = messageArray[i].message;

      this._loading = true;

      const message_timer = timer(0, 350);
      const roller = message_timer.subscribe(t => {
          if (Math.random() > messageArray[i].p) {
              i = (i + 1) % messageArray.length;
              this._loadingMessage = messageArray[i].message;
          }
          if (!this.isLoading()) {
              roller.unsubscribe();
          }
      });

  }

  isLoading(): boolean {
      return this._loading;
  }

  setLoading(l): void {
      this._loading = l;
  }

}
