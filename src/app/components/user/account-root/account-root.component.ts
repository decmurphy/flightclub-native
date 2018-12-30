import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { UserService } from '../user.service';
import { CoreService } from '@shared/services';

@Component({
  selector: 'fc-account-root',
  templateUrl: './account-root.component.html',
  styleUrls: ['./account-root.component.scss']
})
export class AccountRootComponent implements OnInit {

  loading: boolean;
  rewards: any[];
  userReward: any;
  numCols: Observable<number>;

  constructor(
    public userService: UserService,
    private coreService: CoreService,
    private observableMedia: ObservableMedia
  ) { }

  ngOnInit() {

    this.loading = true;

    const grid = new Map([
      ['xs', 2], ['sm', 2],
      ['md', 4],
      ['lg', 6], ['xl', 8]
    ]);

    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });

    this.numCols = this.observableMedia.asObservable().pipe(
      map((change: any) => grid.get(change.mqAlias)),
      startWith(start)
    );

    this.coreService.getRewards()
      .then(data => {
        this.rewards = data.reverse();
        if (this.userService.loggedInUser.role.includes('admin')) {
          this.userReward = this.rewards[0];
        } else {
          this.userReward = this.rewards.find(r => r.amount_cents === this.userService.loggedInUser.patron.pledge);
        }
        this.loading = false;
      });

  }

  selectReward(reward: any): void {
    window.location.href = 'https://www.patreon.com' + reward.url;
  }

}
