import { Mission } from './mission';
import { Engine } from './engine';
import { Company } from './company';
import { Stage } from './stage';
import { LaunchPad } from './launch-pad';

export class ApiCache {
    missions: any[];
    engines: Engine[];
    companies: Company[];
    stages: Stage[];
    launchpads: LaunchPad[];
}
