import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ResultService } from '../result.service';

import {
  Simulation
} from '@shared/index';

@Component({
  selector: 'fc-two-dim-visualisation',
  templateUrl: './two-dim-visualisation.component.html',
  styleUrls: ['./two-dim-visualisation.component.scss']
})
export class TwoDimVisualisationComponent implements OnInit {

  simulationSubscription: Subscription;

  simulation: Simulation;

  constructor(
        public resultService: ResultService
  ) {
    this.simulationSubscription = this.resultService.getSimulation().subscribe(s => {
      this.simulation = s;
    });
  }

  ngOnInit() {

  }

  loadVisualisations(): void {


  }

}
