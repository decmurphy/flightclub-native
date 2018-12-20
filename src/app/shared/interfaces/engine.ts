export class Engine {
    _id: string;
    name: string;
    mass: number;
    ispSL: number;
    ispVac: number;
    thrustSL: number;
    thrustVac: number;
    throttleCapability: number;

    constructor() {
        this.name = 'New Engine';
        this.mass = 0;
        this.ispSL = 0;
        this.ispVac = 0;
        this.thrustSL = 0;
        this.thrustVac = 0;
        this.throttleCapability = 0;
    }
}
