import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ViewEncapsulation } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ResultService } from '@components/result/result.service';

import {
  Simulation,
  PlotlyService
} from '@shared/index';

@Component({
  selector: 'fc-two-dim-visualisation',
  templateUrl: './two-dim-visualisation.component.html',
  styleUrls: ['./two-dim-visualisation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TwoDimVisualisationComponent implements OnInit, AfterViewInit, OnDestroy {

  simulationSubscription: Subscription;

  simulation: Simulation;
  numCols: Observable<number>;

  constructor(
        private observableMedia: ObservableMedia,
        public resultService: ResultService,
        private plotly: PlotlyService
  ) {
    this.simulationSubscription = this.resultService.getSimulation().subscribe(s => {
      this.simulation = s;
    });
  }

  ngOnInit() {
    const grid = new Map([
      ['xs', 2], ['sm', 2],
      ['md', 4],
      ['lg', 6], ['xl', 6]
    ]);

    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });

    this.numCols = this.observableMedia.asObservable().pipe(
      map((change: any) => grid.get(change.mqAlias)),
      startWith(start)
    );

  }

  ngAfterViewInit() {
    this.loadVisualisations();
  }

  ngOnDestroy() {
    this.simulationSubscription.unsubscribe();
  }

  loadVisualisations(): void {

    // plot grid
    this.plotly.setSimulation(this.simulation);
    this.resultService.getPlots().forEach(plot => {
        this.plotly.makeGridPlot(plot);
    });
    setTimeout(() => {this.relayout(); }, 100);

  }

  @HostListener('window:resize', ['$event'])
  relayout() {
      this.resultService.getPlots().forEach(plot => {
          this.plotly.resize(plot);
      });
  }

}
