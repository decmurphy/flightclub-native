import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  src: string;

  constructor(
        public resultService: ResultService,
        private route: ActivatedRoute,
        private router: Router
  ) {
    // this.simulationSubscription = this.resultService.getSimulation().subscribe(s => this.simulation = s);
    this.route.queryParams.subscribe(params => {
      this.src = 'https://www.flightclub.io/result/2d?code=' + params['src'];
    });
  }

  ngOnInit() {

  }

  loadVisualisations(): void {


  }

}
