import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

import { UtilityService } from './utility.service';
import { LocalStorageService } from './local-storage.service';

import {
    Company, Engine, LaunchPad, Mission, Stage
} from '@shared/interfaces';

@Injectable()
export class CoreService {

    clientRoot: string;
    serverRoot: string;
    apiUrl: string;
    accessToken = '';
    headers: HttpHeaders;

    constructor(
        private utilityService: UtilityService,
        private http: HttpClient,
        private localStorage: LocalStorageService
    ) {
        this.headers = new HttpHeaders();
        this.clientRoot = utilityService.buildEndpoint(environment.client);
        this.serverRoot = utilityService.buildEndpoint(environment.server);
        this.apiUrl = this.serverRoot + '/api/v2';

        this.setAccessToken(this.localStorage.get('accessToken'));
    }

    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken(accessToken: string) {
        this.localStorage.put('accessToken', accessToken);
        this.accessToken = accessToken || '';
    }

    /*
        root endpoint
    */
    ping(): Promise<any> {
        return this.http.get('').toPromise();
    }

    /*
        companies/ endpoint
    */
    getCompanies(): Promise<Company[]> {
        return this.http.get<Company[]>(this.apiUrl + '/company').toPromise();
    }

    /*
        engines/ endpoint
    */
    getEngines(): Promise<Engine[]> {
        return this.http.get<Engine[]>(this.apiUrl + '/engine').toPromise();
    }

    /*
        hazardzone/ endpoint
    */
    getHazardZones(code: string): Promise<any> {
        return this.http.get<any>(this.apiUrl + '/hazardzone?code=' + code).toPromise();
    }

    /*
        launchsites/ endpoint
    */
    getLaunchpads(params?: any): Promise<LaunchPad[]> {
        return this.http.get<LaunchPad[]>(this.apiUrl + '/launchpad?' + this.utilityService.serialize(params)).toPromise();
    }

    /*
        missions/ endpoint
    */
    deleteSimulation(id: string): Promise<any> {
        return this.http.delete(this.apiUrl + '/mission/' + id, { withCredentials: true, headers: this.headers }).toPromise();
    }

    getSingleMission(code: string): Promise<Mission> {
        return this.http.get<Mission>(this.apiUrl + '/mission?code=' + code, { withCredentials: true }).toPromise();
    }

    getMissions(): Promise<Mission[]> {
        return this.http.get<Mission[]>(this.apiUrl + '/mission', { withCredentials: true }).toPromise();
    }

    overrideLive(id: string, live_id: string): Promise<any> {
        return this.http.patch(this.apiUrl + '/mission/' + id, { id: live_id },
                { withCredentials: true, headers: this.headers }).toPromise();
    }

    updateMission(id: string, json): Promise<any> {
        return this.http.put(this.apiUrl + '/mission/' + id, json, { withCredentials: true, headers: this.headers }).toPromise();
    }

    /*
        patreon/ endpoint
    */
    getRewards(): Promise<any> {
        return this.http.get(this.apiUrl + '/patreon/rewards', { withCredentials: true }).toPromise();
    }

    getPatreonCampaign(): Promise<any> {
        return this.http.get(this.apiUrl + '/patreon/campaign', { withCredentials: true, headers: this.headers }).toPromise();
    }

    getPatreonPledges(): Promise<any> {
        return this.http.get(this.apiUrl + '/patreon/pledges', { withCredentials: true, headers: this.headers }).toPromise();
    }

    getPatreonGEOPledges(): Promise<any> {
        return this.http.get(this.apiUrl + '/patreon/geoPledges', { withCredentials: true }).toPromise();
    }

    /*
        simulator/ endpoint
    */
    postSimulation(post_data): Promise<any> {
        return this.http.post(this.apiUrl + '/simulation', post_data, { withCredentials: true }).toPromise();
    }

    getSimulationResults(id: string): Promise<any> {
        return this.http.get(this.apiUrl + '/simulation/?id=' + id).toPromise();
    }

    getLiveSimulationResults(code?: string): Promise<any> {
        const ep = '/simulation/live' + (code ? '/?code=' + code : '');
        return this.http.get(this.apiUrl + ep).toPromise();
    }

    /*
        stages/ endpoint
    */
    getStages(): Promise<any> {
        return this.http.get(this.apiUrl + '/stage').toPromise();
    }

    getTrajectoryById(id: string): Promise<any> {
        return this.http.get(this.apiUrl + '/simulation-result?id=' + id).toPromise();
    }

    /*
        user/ endpoint
    */

    getUser(): Promise<any> {
        return this.http.get(this.apiUrl + '/user', { withCredentials: true, headers: this.headers }).toPromise();
    }

    logout(): Promise<any> {
        return this.http.get(this.apiUrl + '/user/logout', { withCredentials: true, headers: this.headers }).toPromise();
    }

    saveSimulation(sim): Promise<any> {
        return this.http.put(this.apiUrl + '/user/simulations', sim, { withCredentials: true, headers: this.headers }).toPromise();
    }

    updateAllSims(allSims): Promise<any> {
        return this.http.post(this.apiUrl + '/user/simulations/', allSims, { withCredentials: true, headers: this.headers }).toPromise();
    }

}
