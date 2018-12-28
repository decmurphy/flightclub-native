import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { plots } from './plotly.result.data.json';

import {
  Simulation,
  CoreService
} from '@shared/index';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

    simulation: Simulation;
    simulationSubject: BehaviorSubject<Simulation>;

    constructor(
      private http: HttpClient,
      private coreService: CoreService
    ) {
      this.simulationSubject = new BehaviorSubject<Simulation>(this.simulation);
    }

    getSimulation(): Observable<Simulation> {
        return this.simulationSubject.asObservable();
    }

    setSimulation(sim: Simulation) {
        this.simulation = sim;
        this.simulationSubject.next(sim);
        this.setPlotStages();
    }

    getPlots(): any[] {
      return plots;
    }

    setPlotStages() {
      const all = this.simulation.mission.vehicle.stages.map(s => [s].concat(s.boosters));
      const lowerStages = all[0];
      const allStages = all.reduce((acc, val) => acc.concat(val), []);
      plots.forEach(plot => {
          if (['drag', 'q', 'phase1'].indexOf(plot.id) === -1) {
              plot.stages = allStages;
          } else {
              plot.stages = lowerStages;
          }
      });
    }

    overrideLive(simulation: Simulation): Promise<any> {
      return this.coreService.overrideLive(simulation.mission._id, simulation.simulationId);
    }

}
