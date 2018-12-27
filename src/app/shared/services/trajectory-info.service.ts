import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from './core.service';

import { Simulation } from '@shared/interfaces';

@Injectable({
    providedIn: 'root'
})
export class TrajectoryInfoService {

    totalFiles: number;
    hazardZones: any[];

    constructor(
        private http: HttpClient,
        private coreService: CoreService
    ) {
    }

    getAllData(simulation: Simulation): Promise<any> {

        const promises = new Array<Promise<any>>();
        const simulationId = simulation.simulationId;

        const fullData = {
            hazardZones: [],
            simulations: []
        };

        promises.push(
            this.getHazardZones(simulation.mission.code)
                .then((response: any) => {
                    fullData.hazardZones = response;
                    return fullData;
                })
            );

        promises.push(
            this.coreService.getTrajectoryById(simulationId)
                .then((response: any) => {
                    fullData.simulations.push(response);
                    return fullData;
                })
            );

        return Promise.all(promises);

    }

    getHazardZones(code: string): Promise<any> {

        if (this.hazardZones) {
            return new Promise(resolve => resolve(this.hazardZones));
        } else {
            return this.coreService.getHazardZones(code)
                .then((res: any) => {
                    this.hazardZones = res.zones;
                    return this.hazardZones;
                })
                .catch(error => {
                    return [];
                });
        }

    }

    getLiveMissionDetails(code?: string): Promise<any> {
        return this.getDetailsCommon(this.coreService.getLiveSimulationResults(code));
    }

    getMissionDetails(id: string): Promise<any> {
        return this.getDetailsCommon(this.coreService.getSimulationResults(id));
    }

    async getDetailsCommon(apiRequest: Promise<any>): Promise<any> {

        const simulationInfo = await apiRequest;
        const allData = await this.getAllData(simulationInfo);

        simulationInfo.data = allData[0];

        /*
            Comment out the following block to transpose the data back to how the API returns it
            i.e data grouped by timestamp, not by attribute name
        */
        simulationInfo.data.simulations.forEach(sim => {
            sim.stageTrajectories.forEach(st => {
                st.telemetry = this.transpose(st.telemetry);
                st.events = this.transpose(st.events);
            });
        });

        return simulationInfo;

    }

    transpose(data) {
        const result = {};
        for (const row of data) {
            for (const [key, value] of Object.entries(row)) {
                result[key] = result[key] || [];
                result[key].push(value);
            }
        }
        return result;
    }

}
