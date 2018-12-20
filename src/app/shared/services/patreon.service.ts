import { Injectable } from '@angular/core';

import { LoadScreenService } from '@components/load-screen';

import { CoreService } from './core.service';
import { LocalStorageService } from './local-storage.service';
import { UtilityService } from './utility.service';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PatreonService {

  patrons: any[];
  campaign: any[];
  pledges: any[];

  constructor(
    private loadScreenService: LoadScreenService,
    private coreService: CoreService,
    private localStorageService: LocalStorageService,
    private utilityService: UtilityService
  ) {
    const storedGeoPledges = this.localStorageService.get('fc_geoPledges');
    if (storedGeoPledges) {
      const geoPledges = JSON.parse(storedGeoPledges);
      this.loadScreenService.addPatronsToLoadScreen(geoPledges.map(p => p.name));
    }
  }

  loginWithPatreon() {

    let state = this.coreService.clientRoot;
    if (environment.production) {
      state = this.utilityService.buildEndpoint({
        protocol: environment.client.protocol,
        host: environment.client.host,
        port: undefined
      }); // production doesn't liek the port number
    }
    let url = 'https://www.patreon.com/oauth2/authorize';
    url += '?response_type=code';
    url += '&client_id=' + environment.patreon.client_id;
    url += '&redirect_uri=' + this.coreService.apiUrl + environment.patreon.redirect_uri;
    url += '&state=' + state;
    window.location.href = url;
  }

  getPatreonCampaign(): Promise<any> {
      return this.coreService.getPatreonCampaign()
        .then(campaign => this.campaign = campaign);
  }

  getPatreonGEOPledges(): Promise<any> {
      return this.coreService.getPatreonGEOPledges()
        .then(geoPledges => {
          const storedGeoPledges = this.localStorageService.get('fc_geoPledges');
          if (storedGeoPledges !== JSON.stringify(geoPledges)) {
            this.localStorageService.put('fc_geoPledges', JSON.stringify(geoPledges));
            this.loadScreenService.addPatronsToLoadScreen(geoPledges.map(p => p.name));
          }
        });
  }

  getPatreonPledges(): Promise<any> {
      return this.coreService.getPatreonPledges()
        .then(pledges => {
          this.pledges = pledges;
        });
  }

  getPatronsByTier(tier: string): any[] {
    if (this.pledges == null) {
      return [];
    }
    return this.pledges
        .filter(pledge => pledge.reward)
        .filter(pledge => pledge.reward.title === tier)
        .map(pledge => pledge.patron);
  }

}
