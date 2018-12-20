import { LaunchPad } from './launch-pad';
import { Vehicle } from './vehicle';
import { Event } from './event';
import { Payload } from './payload';

export interface Mission {
    orbits?: number;
    _id: any;
    code: string;
    description: string;
    datetime: string;
    launchpad: LaunchPad;
    company: any;
    display: boolean;
    livelaunch: string;
    payload: Payload;
    vehicle: Vehicle;
    events: Event[];
}
