import { Mission } from './mission';

export interface Simulation {
    simulationId: string;
    userId?: any;
    mission: Mission;
    data?: any;
    options: any;
}
