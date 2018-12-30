import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
// import { BuildService } from '@components/build/build.service';
import { LocalStorageService, Mission } from '@shared/index';

@Component({
  selector: 'fc-saved-simulations',
  templateUrl: './saved-simulations.component.html',
  styleUrls: ['./saved-simulations.component.scss']
})
export class SavedSimulationsComponent implements OnInit {

  _savedSims: any[];

  constructor(
    public user: UserService,
    // private buildService: BuildService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loadSimulationFromHash(hash: string): void {
    const mission = JSON.parse(window.atob(hash)) as Mission;
    // this.buildService.setMission(mission);
    // this.router.navigate(['build']);
  }

  removeSimulation(savedSimulation: any) {
    this.user.removeSavedSim(savedSimulation);
  }

}
