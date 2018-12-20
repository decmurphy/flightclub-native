import { Engine } from './engine';

export class EngineConfig {
    engineId: number;
    number: number;
    engine: Engine;

    constructor(_id: number) {
        this.engineId = _id;
        this.number = 0;
        this.engine = new Engine();
    }
}
