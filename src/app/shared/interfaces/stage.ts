import { EngineConfig } from './engine-config';

export class Stage {
    _id: number;
    name: string;
    displayName: string;
    stageNumber: number;
    radius: number;
    length: number;
    dryMass: number;
    fuelCapacity: number;
    maxAccel: number;
    propMass: number;
    minimumFuel: number;
    engines: EngineConfig[];
    boosters?: Stage[];
    fairingMass?: number;
    fairingRadius?: number;

    constructor(_stageNumber: number) {
        this.stageNumber = _stageNumber;
        this.engines = new Array<EngineConfig>();
        this.boosters = new Array<Stage>();
    }
}
