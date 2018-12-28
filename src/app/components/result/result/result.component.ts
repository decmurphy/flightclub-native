import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { filter, startWith } from 'rxjs/operators';

import {
  Simulation,
  SidenavService, TrajectoryInfoService
} from '@shared/index';

import { UserService } from '@components/user';
import { ResultService } from '../result.service';

@Component({
  selector: 'fc-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @ViewChild('resultSidenav') public resultSidenav: MatSidenav;

  watcher: any;
  opened: boolean;
  mode: string;

  simulation: Simulation;
  queryParams: any;
  resultRoute: string;

  overrideLiveStatus: any;
  isResultLoading: boolean;
  isResultLoadSuccess: boolean;

  constructor(
    private media: ObservableMedia,
    private route: ActivatedRoute,
    public router: Router,
    public user: UserService,
    private resultService: ResultService,
    private sidenavService: SidenavService,
    private trajectoryInfoService: TrajectoryInfoService
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

    this.sidenavService.addSidenav('resultSidenav', this.resultSidenav);

    this.overrideLiveStatus = { in_progress: false, show_success: false, color: '', icon: '' };
    this.route.queryParams.subscribe(params => {
        this.queryParams = params;
    });

    this.resultRoute = this.router.url;
    this.router.events
        .pipe(filter((event: Event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => { this.resultRoute = event.url; });

    this.loadSimulationData();
  }

    toggleNav(id: string): void {
        this.sidenavService.toggleNav(id);
    }

    navigate(routeArray: string[], options?: any): void {
        this.router.navigate(routeArray, options);
        if (this.media.isActive('xs') || this.media.isActive('sm')) {
            this.toggleNav('resultSidenav');
        }
    }

  loadSimulationData() {

      this.isResultLoading = true;
      this.isResultLoadSuccess = false;

      let apiRequest;
      if (this.queryParams.id === undefined) {
          apiRequest = this.trajectoryInfoService.getLiveMissionDetails(this.queryParams.code);
      } else {
          apiRequest = this.trajectoryInfoService.getMissionDetails(this.queryParams.id);
      }

      apiRequest
        .then(response => {

          this.simulation = response;
          this.simulation.options = {};
          this.resultService.setSimulation(this.simulation);

          this.isResultLoading = false;
          this.isResultLoadSuccess = true;

        })
        .catch(function(err) {
            console.log(err);
        });
  }

  routeMatches(route: string): boolean {
      return this.resultRoute.startsWith('/result/' + route);
  }

  overrideLive() {

    this.overrideLiveStatus.in_progress = true;
    this.resultService.overrideLive(this.simulation)
        .then(() => {
            this.overrideLiveStatus = { in_progress: false, show_success: true, color: '#82CA9D', icon: 'check' };
            setTimeout(() => {
                this.overrideLiveStatus.show_success = false;
                this.overrideLiveStatus.color = '';
                this.overrideLiveStatus.icon = '';
            }, 4000);
        })
        .catch(() => {
            this.overrideLiveStatus = { in_progress: false, show_success: true, color: '#F7977A', icon: 'close' };
            setTimeout(() => {
                this.overrideLiveStatus.show_success = false;
                this.overrideLiveStatus.color = '';
                this.overrideLiveStatus.icon = '';
            }, 4000);
        });

  }

}
