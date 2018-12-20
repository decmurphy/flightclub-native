import { Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { messages } from './load-screen.messages.json';

@Injectable()
export class LoadScreenService {

  _loading: boolean;
  _loadingMessage: string;
  page: string;
  geoPatrons: any[];

  constructor( ) {
        this._loading = false;
        this._loadingMessage = '';

        if (this.geoPatrons) {
            this.addPatronsToLoadScreen(this.geoPatrons);
        }

    }

    addPatronsToLoadScreen(geoPatrons: any[]) {
        if (messages) {
            Object.keys(messages).forEach(key => {
                messages[key].unshift({
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

      if (messages === undefined) {
          this.page = page;
          return;
      }

      const messageArray = messages[page] || messages['build'];
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
