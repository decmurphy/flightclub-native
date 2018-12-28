import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ResultService } from '../result.service';
import { UserService } from '@components/user';

import { Simulation } from '@shared/interfaces';

@Component({
  selector: 'fc-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit, OnDestroy {

  simulationSubscription: Subscription;

  simulation: Simulation;
  eventLog: any;
  warnings: any;
  stageTrajectories: any[];

  constructor(
    public user: UserService,
    private resultService: ResultService
  ) {
        this.simulationSubscription = this.resultService.getSimulation().subscribe(s => this.simulation = s);
  }

  ngOnInit() {

    const sim = this.simulation.data.simulations.find(s => s.simulationId = this.simulation.simulationId);

    this.eventLog = sim.eventLog;
    this.warnings = sim.warnings;

    this.stageTrajectories = sim.stageTrajectories
        .map(st => {

          this.simulation.mission.vehicle.stages.forEach(stage => {
            if (stage.stageNumber === st.stageNumber) {
              st.stageName = stage.displayName;
            }
            stage.boosters.forEach(booster => {
              if (booster.stageNumber === st.stageNumber) {
                st.stageName = booster.displayName;
              }
            });
          });

          if (st.landing != null) {
            st.landing.success = st.landing.velocity < 5 ? 'Successful Landing' : 'Unsuccessful Landing';
          }

          if (st.orbit != null) {

            const periapsis = (1 - st.orbit.eccentricity) * st.orbit.semiMajorAxis;
            const apoapsis = (1 + st.orbit.eccentricity) * st.orbit.semiMajorAxis;
            const effPeriapsis = (periapsis - 6378137) * 1e-3;
            const effApoapsis = (apoapsis - 6378137) * 1e-3;

            st.orbit.toString = this.round(effPeriapsis) + ' km x '
                + this.round(effApoapsis) + ' km x '
                + this.round(st.orbit.inclination) + ' °';

          }

          return st;
        });

  }

  round(num) {
    return Math.round(num * 100) / 100;
  }

  ngOnDestroy() {
    this.simulationSubscription.unsubscribe();
  }

  getStageName(i) {
    return this.simulation.mission.vehicle.stages.find(s => s.stageNumber === i).displayName;
  }

}
