import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';

import { Simulation } from '@shared/interfaces';

import { ResultService } from '../result.service';

@Component({
  selector: 'fc-three-dim-visualisation',
  templateUrl: './three-dim-visualisation.component.html',
  styleUrls: ['./three-dim-visualisation.component.scss']
})
export class ThreeDimVisualisationComponent implements OnInit {

  simulationSubscription: Subscription;

  simulation: Simulation;
  src: string;

  constructor(
    private resultService: ResultService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.simulationSubscription = this.resultService.getSimulation().subscribe(s => this.simulation = s);
    this.route.queryParams.subscribe(params => {
      this.src = 'https://www.flightclub.io/result/3d?code=' + params['src'];
    });
  }

  ngOnInit() {

  }

}
