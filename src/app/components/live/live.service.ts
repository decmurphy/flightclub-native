import { Injectable } from '@angular/core';
import * as moment from 'moment';

import {
  Simulation
} from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  simulation: any;
  stageColours: string[];
  vel: number[];
  alt: number[];

  constructor() {
    this.stageColours = ['#ff0000', '#8B8BE5', '#00ff00'];
    this.vel = []; // vel vs. time - grows in real time
    this.alt = []; // alt v. time - grows in real time
  }

  getSimulation() {
    return this.simulation;
  }

  setSimulation(simulation: Simulation): void {
    this.simulation = simulation;
  }

  getMissionName(): string {
    return this.simulation ? this.simulation.mission.description : '';
  }

  msToTime(duration: moment.Duration): any {

    const milliseconds = duration.get('ms'),
      seconds = duration.get('s'),
      minutes = duration.get('m'),
      hours = duration.get('h'),
      days = duration.get('d');

    return {
      milliseconds: milliseconds,
      seconds: seconds.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      days: days
    };

  }



}
