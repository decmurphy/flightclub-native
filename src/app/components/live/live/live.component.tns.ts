import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import * as moment from 'moment';
import { Page } from 'tns-core-modules/ui/page';
import * as utilsModule from 'tns-core-modules/utils/utils';

import {
  Simulation,
  TrajectoryInfoService, SidenavService
} from '@shared/index';

import { CesiumService } from '@components/cesium';
import { LiveService } from '../live.service';

@Component({
  selector: 'fc-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  watcher: any;
  opened: boolean;
  mode: string;

  intervals: any[];
  isLiveLoading: boolean;
  isShowCesium: boolean;
  isShowCountdown: boolean;
  isLaunchFinished: boolean;
  timeouts: any[];
  countdown: any;
  clockUpdateTimer: Subscription;

  simulation: Simulation;

    constructor(
      private page: Page,
      private route: ActivatedRoute,
      private router: Router,
      public sidenavService: SidenavService,
      private liveService: LiveService,
      private trajectoryInfoService: TrajectoryInfoService,
    ) { }

    ngOnInit() {
      this.page.actionBarHidden = true;

      this.intervals = [];
      this.isLiveLoading = true;
      this.isShowCesium = false;
      this.isShowCountdown = false;
      this.isLaunchFinished = false;
      this.timeouts = [];
      this.countdown = {};

      this.getLiveMission();
    }

  getMissionName(): string {
    return this.liveService.getMissionName();
  }

  async getLiveMission(): Promise<void> {

    this.trajectoryInfoService.getLiveMissionDetails()
      .then(sim => {
        sim.options = {
          w: '1'
        };
        this.simulation = sim;

        this.liveService.setSimulation(this.simulation);
        this.buildAllVisualisations();
      })
      .catch(error => {
        console.log(error);
        const frag = window.btoa('There is no Flight Profile assigned to this mission yet! Check again closer to the launch date.');
        this.router.navigate(['.']);
      });

  }

  buildAllVisualisations() {

    if (this.simulation.options.w === '1') {

      const now = moment().utc();
      const missionDateTime = moment(this.simulation.mission.datetime).utc();
      const hoursUntilLaunch = moment.duration(missionDateTime.diff(now)).asHours();

      if (hoursUntilLaunch > 1) { // > 1hr until launch
        this.clockUpdateTimer = timer(0, 1000).subscribe(() => this.setClock(missionDateTime));
        this.isShowCountdown = true;
        this.isLiveLoading = false;
        return;
      }

      if (hoursUntilLaunch < -1.5) { // > 1.5hrs after launch
        this.isLaunchFinished = true;
        this.isLiveLoading = false;
        return;
      }
    }

    this.onVisualisationLoad();
  }

  onVisualisationLoad() {
    this.isLiveLoading = false;
    this.isShowCesium = true;
    // this.setCesiumClock();
    // setTimeout(() => this.sidenavService.addSidenav('liveSidenav', this.liveSidenav), 500);
  }
/*
  setCesiumClock() {
    const launchTime = new Date(this.simulation.mission.datetime);
    const now = this.simulation.options.w === '1' ? new Date() : new Date(launchTime.getTime() - 30e3);
    const end = new Date(launchTime.getTime() + 600e3);

    const clock = new Cesium.Clock({
      startTime: Cesium.JulianDate.fromDate(launchTime),
      currentTime: Cesium.JulianDate.fromDate(now),
      stopTime: Cesium.JulianDate.fromDate(end),
      clockRange: Cesium.ClockRange.UNBOUNDED,
      clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
      shouldAnimate: true
    });

    this.cesiumService.setClock(clock);
  }
*/
  setClock(launchTime: moment.Moment) {
    const now = moment().utc();
    const duration = moment.duration(launchTime.diff(now));
    this.countdown = this.liveService.msToTime(duration);
  }

  toggleDrawer(): void {
    this.sidenavService.toggleNav('drawer');
  }

  view2d() {

  }

  view3d() {
    const navigationExtras: NavigationExtras = {
        queryParams: {
            'code': this.simulation.mission.code
        }
    };
    // this.router.navigate(['result', '3d'], navigationExtras);

    utilsModule.openUrl('https://www.flightclub.io/result/3d?code=' + this.simulation.mission.code);
  }
}
