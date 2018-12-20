import { Injectable } from '@angular/core';

import {
  CoreService, PatreonService
} from '@shared/services';

@Injectable()
export class UserService {

  _savedSims: any[];
  loggedInUser: any;

  constructor(
    private coreService: CoreService,
    private patreonService: PatreonService
  ) {
    this._savedSims = [];
    this.loggedInUser = {
      patron: null,
      role: ''
    };
  }

  getSavedSims(): any[] {
    return this._savedSims;
  }

  hasRole(role: string): boolean {
    if (this.loggedInUser.role && this.loggedInUser.role.includes('admin')) {
      return true;
    }
    return this.loggedInUser.role.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isMEOPatron(): boolean {
    return this.hasRole('admin') || this.hasRole('guest') || (this.hasRole('patron') && this.loggedInUser.patron.pledge >= 500);
  }

  isGTOPatron(): boolean {
    return this.hasRole('admin') || this.hasRole('guest') || (this.hasRole('patron') && this.loggedInUser.patron.pledge >= 1000);
  }

  isGEOPatron(): boolean {
    return this.hasRole('admin') || (this.hasRole('patron') && this.loggedInUser.patron.pledge >= 1500);
  }

  isTLIPatron(): boolean {
    return this.hasRole('admin') || (this.hasRole('patron') && this.loggedInUser.patron.pledge >= 2500);
  }

  isLoggedIn(): boolean {
    return this.loggedInUser.patron;
  }

  logout(): Promise<any> {
    return this.coreService.logout()
      .then((response: any) => {
        this.coreService.setAccessToken('');
        this.loggedInUser.patron = null;
        this.loggedInUser.role = [];
      });

  }

  formatSavedSims() {
    this._savedSims = this.loggedInUser.simulations
        .map(sim => {
          const tempForm = JSON.parse(window.atob(sim.simHash));
          const m = tempForm.mission || tempForm.Mission;
          const desc = m ? m.description : tempForm.description;
          return {
            simHash: sim.simHash,
            usernote: sim.usernote,
            mission: desc,
            timestamp: sim.timestamp,
            prettyTime: new Date(sim.timestamp).toUTCString()
          };
        })
        .reverse();
  }

  removeSavedSim(obj): Promise<any> {

    const simToRemove = this.loggedInUser.simulations.find(sim => sim.timestamp === obj.timestamp);
    const index = this.loggedInUser.simulations.indexOf(simToRemove);
    this.loggedInUser.simulations.splice(index, 1);

    return this.coreService.updateAllSims(this.loggedInUser.simulations)
      .then((user: any) => {
        this.loggedInUser = user;
        this.formatSavedSims();
      });
  }

  getUser(): void {
    this.coreService.getUser()
      .then((user: any) => {
        if (user) {
          this.loggedInUser = user;
          this.formatSavedSims();
        }
      }).catch(error => {
        console.log(error);
      });
  }

}
