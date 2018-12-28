import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { Page } from 'tns-core-modules/ui/page';

import {
  Simulation,
  TrajectoryInfoService
} from '@shared/index';

import { UserService } from '@components/user';
import { ResultService } from '../result.service';

@Component({
  selector: 'fc-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
    private page: Page,
    private route: ActivatedRoute,
    public router: Router,
    public user: UserService,
    private resultService: ResultService,
    private trajectoryInfoService: TrajectoryInfoService
  ) {
    }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }


  loadSimulationData() {
}


}
