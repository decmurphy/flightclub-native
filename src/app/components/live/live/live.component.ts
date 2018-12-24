import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription, timer } from 'rxjs';
import * as moment from 'moment';

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
export class LiveComponent implements OnInit, OnDestroy {

  @ViewChild('liveSidenav') public liveSidenav: MatSidenav;

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

  simulation: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private media: ObservableMedia,
    private sidenavService: SidenavService,
    private cesiumService: CesiumService,
    private liveService: LiveService,
    private trajectoryInfoService: TrajectoryInfoService,
  ) {
    // ObservableMedia only fires on page load if xs or sm. Initialise values here for gt-sm
    this.opened = true;
    this.mode = 'side';
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.mode = 'over';
      } else {
        this.opened = true;
        this.mode = 'side';
      }
    });
  }

  ngOnInit() {

    this.intervals = [];
    this.isLiveLoading = true;
    this.isShowCesium = false;
    this.isShowCountdown = false;
    this.isLaunchFinished = false;
    this.timeouts = [];
    this.countdown = {};

    this.route.queryParams
      .subscribe(params => {
        this.getLiveMission(params);
      });

  }

  ngOnDestroy() {
    this.clockUpdateTimer.unsubscribe();
  }

  getMissionName(): string {
    return this.liveService.getMissionName();
  }

  async getLiveMission(queryParams: any): Promise<void> {

    this.trajectoryInfoService.getLiveMissionDetails(queryParams.code)
      .then(sim => {
        sim.options = {
          w: queryParams.w || '1',
          test: queryParams.test
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
    this.setCesiumClock();
    setTimeout(() => this.sidenavService.addSidenav('liveSidenav', this.liveSidenav), 500);
  }

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

  setClock(launchTime: moment.Moment) {
    const now = moment().utc();
    const duration = moment.duration(launchTime.diff(now));
    this.countdown = this.liveService.msToTime(duration);
  }

}
