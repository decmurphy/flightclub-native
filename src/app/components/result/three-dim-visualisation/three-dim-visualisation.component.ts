import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Simulation } from '@shared/interfaces';
import { CesiumService } from '@components/cesium';

import { ResultService } from '../result.service';

@Component({
  selector: 'fc-three-dim-visualisation',
  templateUrl: './three-dim-visualisation.component.html',
  styleUrls: ['./three-dim-visualisation.component.scss']
})
export class ThreeDimVisualisationComponent implements OnInit, OnDestroy, AfterViewInit {

  simulationSubscription: Subscription;

  simulation: Simulation;

  constructor(
    private resultService: ResultService,
    private cesium: CesiumService
  ) {
    this.simulationSubscription = this.resultService.getSimulation().subscribe(s => this.simulation = s);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const launchTime = new Date(this.simulation.mission.datetime);
    const clock = new Cesium.Clock({
      currentTime: Cesium.JulianDate.fromDate(launchTime),
      clockRange: Cesium.ClockRange.UNBOUNDED,
      clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
      shouldAnimate: false
    });
    this.cesium.setClock(clock);
  }

  ngOnDestroy() {
    this.simulationSubscription.unsubscribe();
  }

}
