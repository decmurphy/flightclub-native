import { Component, OnInit, AfterViewInit, OnDestroy, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import * as moment from 'moment';
import { Chart } from 'chart.js';

import {
  CesiumService
} from '@components/cesium';

import {
  ChartJsService, TrajectoryInfoService, SidenavService
} from '@shared/services';

import {
  Point, Simulation
} from '@shared/interfaces';

import {
  LiveService
} from '../live.service';

@Component({
  selector: 'fc-live-sidenav',
  templateUrl: './live-sidenav.component.html',
  styleUrls: ['./live-sidenav.component.scss']
})
export class LiveSidenavComponent implements OnInit, AfterViewInit, OnDestroy {

  simulation: Simulation;

  future: any[];
  stageColours: string[];
  telemetry_plot: any;
  stageNames: string[];
  altitudeString: string;
  velocityString: string;
  clock: string;

  clockUpdateTimer: Subscription;
  telemetryUpdateTimer: Subscription;
  plotUpdateTimer: Subscription;

  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    public cesiumService: CesiumService,
    private chartjs: ChartJsService,
    private liveService: LiveService,
    private trajectoryInfoService: TrajectoryInfoService,
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {

    this.simulation = this.liveService.getSimulation();

    this.future = []; // full alt and vel data
    this.stageColours = ['#ff0000', '#8b8be5', '#00ff00'];
    this.telemetry_plot = {};

    this.stageNames = this.simulation.mission.vehicle.stages.map(stage => stage.displayName.trim());

    this.fillFutureArray();

    ['altitude', 'velocity'].forEach(el => {
      this.constructPlot(el);
      this.drawPlot(el);
    });

    const launchTime = moment(this.simulation.mission.datetime).utc();

    // Period = worst case delay allowed when updating every 1s
    this.clockUpdateTimer = timer(0, 950).subscribe(() => this.setClock(launchTime));

    // Light and we do millisecond interpolation to make it look smoother on the UI
    this.telemetryUpdateTimer = timer(0, 150).subscribe(() => this.updateTelemetry(launchTime)); // 150

    // Heavier and no interpolation happening - no point doing it any faster than 1s
    this.plotUpdateTimer = timer(0, 1000).subscribe(() => this.updatePlots(launchTime));

  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.clockUpdateTimer.unsubscribe();
    this.telemetryUpdateTimer.unsubscribe();
    this.plotUpdateTimer.unsubscribe();
  }

  clickStage(stage: number): void {

    this.cesiumService.trackEntity(stage);

    // Reset y-axes of plots to fit all of the tracked stage's telemetry
    this.telemetry_plot.altitude.options.scales.yAxes[0].ticks.max
      = Math.ceil(this.future[stage].altitude.max / 50) * 50;
    this.telemetry_plot.velocity.options.scales.yAxes[0].ticks.max
      = Math.ceil(this.future[stage].velocity.max / 500) * 500;

    this.telemetry_plot.altitude.update();
    this.telemetry_plot.velocity.update();
  }

  getStageIds(): number[] {
    if (this.simulation === undefined) {
      return [];
    }
    const a = new Array(this.simulation.mission.vehicle.stages.length);
    // console.log(a);
    return a;
  }

  constructPlot(col: string): void {

    const canvas = this.elementRef.nativeElement.querySelector('#' + col + '_plot');
    const ctx = canvas.getContext('2d');

    const stepSize = col === 'altitude' ? 50 : 500;

    const data = [];
    const options = {
      animation: {
        duration: 0, // general animation time
      },
      hover: {
        animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
      legend: {
        display: false
      },
      layout: {
            padding: 10
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: 600,
            beginAtZero: true
          },
          gridLines: {
            color: '#555'
          },
        }],
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: Math.ceil(this.future[0][col].max / stepSize) * stepSize, // tracking stage zero by default
            beginAtZero: true
          },
          gridLines: {
            color: '#555'
          },
        }],
      }
    };

    this.telemetry_plot[col] = this.chartjs.buildChart(ctx, data, options);

  }

  drawPlot(col: string): void {

    const initialData = [];

    for (let stage = 0; stage < this.simulation.mission.vehicle.stages.length; stage++) {
      initialData.push({
        data: [],
        showLine: false,
        pointStyle: 'circle',
        pointBackgroundColor: '#ffffff'
      });
      initialData.push({
        data: [],
        borderColor: this.stageColours[stage],
        // backgroundColor: this.stageColours[stage],
        fill: true,
        showLine: true,
        pointRadius: 0,
        events: ['click']
      });
      initialData.push({
        data: this.get2dData(this.future[stage].time.data, this.future[stage][col].data),
        borderColor: '#aaaaaa',
        fill: false,
        showLine: true,
        pointRadius: 0,
        events: []
      });
    }

    this.telemetry_plot[col].data.datasets = initialData;

  }

  fillFutureArray(): void {

    const allData = this.simulation.data.simulations.find(sim => sim.simulationId === this.simulation.simulationId);

    const start_time = -5,
      end_time = 5400;

    /*
        Build 'future' array which is a subset of allData for 0s < T < 600s.
        Holds property value for given time in future[stage][property].data[time]
        where 'stage' is the integer id, 'property' is the property column number,
        and 'time' is seconds after T+0.

        Also holds maximum value for a property in future[stage][property].max
    */
    for (let stage = 0; stage < this.simulation.mission.vehicle.stages.length; stage++) {

      const stageTrajectory = allData.stageTrajectories.filter(st => st.stageNumber === stage)[0];

      const events = stageTrajectory.events;
      const trajectory = stageTrajectory.telemetry;

      this.future[stage] = [];
      Object.keys(trajectory).forEach((prop, index) => {

        this.future[stage][prop] = { data: [], events: [] };

        // Put trajectory into future.data
        for (let i = 0; i < trajectory[prop].length; i++) {

          if (trajectory.time[i] > start_time && trajectory.time[i] < end_time) {
            this.future[stage][prop].data[Math.floor(trajectory.time[i])] = trajectory[prop][i];
          }

        }

        // Compute and store maximum future.data value for each property
        this.future[stage][prop].max = this.future[stage][prop].data.reduce((a, b) => Math.max(a, b));

        // Put events into future.events
        for (let i = 0; i < events[prop].length; i++) {

          if (events.time[i] > start_time && events.time[i] < end_time) {
            this.future[stage][prop].events[Math.floor(events.time[i])] = events[prop][i];
          }

        }


      });

    }

    this.altitudeString = (1000 * this.future[0].altitude.data[0]).toFixed(3) + 'm';
    this.velocityString = (this.future[0].velocity.data[0]).toFixed(3) + 'm/s';
  }

  // Build a 2D array of (x, y) data points from an x and y array for 0<arr_x[i]<max_x
  get2dData(arr_x: number[], arr_y: number[], max_x = Infinity): Point[] {
    return arr_x
        .filter(x => x < max_x)
        .map(x => {
          return { x: x, y: arr_y[arr_x.indexOf(x)] };
        });
  }

  setClock(launchTime) {

    if (!this.sidenavService.isOpen('liveSidenav')) {
      return;
    }

    const now = this.cesiumService.getClock();
    const duration = moment.duration(launchTime.diff(now));
    const t = duration.asMilliseconds() > 0 ? 'T-' : 'T+';

    const countdown = this.liveService.msToTime(duration.abs());

    this.clock = t + countdown.hours + ':' + countdown.minutes + ':' + countdown.seconds;

  }

  updatePlots(launchTime: moment.Moment) {

    const timeSinceLaunch = moment.duration(this.cesiumService.getClock().diff(launchTime));
    const elapsedTime = timeSinceLaunch.asSeconds();

    if (elapsedTime >= -10) {

      if (elapsedTime > 600) {
        this.plotUpdateTimer.unsubscribe();
        return;
      }

      if (!this.sidenavService.isOpen('liveSidenav')) {
        return;
      }

      ['altitude', 'velocity'].forEach((prop, p) => {

        for (let s = 0; s < this.simulation.mission.vehicle.stages.length; s++) {

          // Factor of 3 here comes from plotData having structure [events, data, future, events, data, future ...]
          this.telemetry_plot[prop].data.datasets[3 * s].data
            = this.get2dData(this.future[s].time.events, this.future[s][prop].events, elapsedTime);
          this.telemetry_plot[prop].data.datasets[3 * s + 1].data
            = this.get2dData(this.future[s].time.data, this.future[s][prop].data, elapsedTime);

          this.telemetry_plot[prop].update();

        }

      });
    }

  }

  updateTelemetry(launchTime: moment.Moment) {

    const timeSinceLaunch = moment.duration(this.cesiumService.getClock().diff(launchTime));
    const elapsedTime = Math.floor(timeSinceLaunch.asSeconds());

    if (elapsedTime === -20) {
      this.cesiumService.trackEntity(0);
    }

    if (elapsedTime === -10) {
      this.cesiumService.viewLaunchsite();
    }

    if (!this.sidenavService.isOpen('liveSidenav')) {
      return;
    }

    if (elapsedTime >= -10) { // only execute this code after T-00:00:10

      const trackedStage = this.cesiumService.getTrackedStage();

      let targetStage;
      if (this.future[trackedStage] && this.future[trackedStage].time.data[elapsedTime]) {
        targetStage = trackedStage;
      } else if (this.future[trackedStage - 1] && this.future[trackedStage - 1].time.data[elapsedTime]) {
        targetStage = trackedStage - 1;
      } else {
        targetStage = 0;
      }

      const stageFuture = this.future[targetStage];

      const altSeries = stageFuture.altitude.data;
      const velSeries = stageFuture.velocity.data;

      let alt, vel;
      if (stageFuture.time.data[elapsedTime] === undefined) {
        // By default, set the altitude and velocity to the values at T+0
        alt = parseFloat(altSeries[0]);
        vel = parseFloat(velSeries[0]);
      } else {
        // After T+0, the altitude and velocity series have 1s intervals but we want to make it look continuous
        // So interpolate the data here to the millisecond
        const ms = timeSinceLaunch.get('ms') / 1000;
        alt = (altSeries[elapsedTime] + (altSeries[elapsedTime + 1] - altSeries[elapsedTime]) * ms).toFixed(3);
        vel = (velSeries[elapsedTime] + (velSeries[elapsedTime + 1] - velSeries[elapsedTime]) * ms).toFixed(3);
      }

      this.altitudeString = (alt < 1 ? 1000 * alt + 'm' : alt + 'km');
      this.velocityString = Math.floor(vel) + 'm/s';

    }
  }

}
