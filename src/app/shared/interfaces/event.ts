import { Attitude } from './attitude';
import { EventEngine } from './event-engine';

export class Event {
    type: string;
    name: string;
    engines: EventEngine[];
    stageNumbers: number[];
    time: number;
    end: number;
    attitude: Attitude;
    dynamic: boolean;

    constructor() {
        this.engines = [];
        this.stageNumbers = [];
        this.attitude = {} as Attitude;
        this.dynamic = false;
    }
}
