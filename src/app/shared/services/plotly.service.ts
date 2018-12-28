import { Injectable } from '@angular/core';

import * as Plotly from 'plotly.js';
import { Config, Data, Layout } from 'plotly.js';

import { Simulation } from '@shared/interfaces';

@Injectable({
    providedIn: 'root'
})
export class PlotlyService {

    simulation: Simulation;
    fontColor = '#fafafa';
    bgColor = '#303030';

    constructor() { }

    setSimulation(simulation: Simulation): void {
        this.simulation = simulation;
    }

    getLayout(plot) {
        return {
            title: plot.title,
            showlegend: false,
            font: {
                family: 'Brandon Grotesque',
                size: 15,
                color: this.fontColor
            },
            xaxis: {
                color: this.fontColor,
                type: plot.x.type,
                title: plot.x.label,
                range: plot.x.range
            },
            yaxis: {
                color: this.fontColor,
                type: plot.y[0].type,
                title: plot.y[0].label,
                range: plot.y[0].range
            },
            paper_bgcolor: this.bgColor,
            plot_bgcolor: this.bgColor,
            autosize: true
        };
    }

    buildPlotData(plot) {

        const data = [];

        this.simulation.data.simulations.forEach((simulationData: any) => {

            plot.stages.forEach(stageToPlot => {

                const stageTrajectories = simulationData.stageTrajectories.filter(traj => traj.stageNumber === stageToPlot.stageNumber);
                if (stageTrajectories == null || stageTrajectories[0] == null) {
                    return;
                }

                const telemetry = stageTrajectories[0].telemetry;
                if (telemetry !== undefined) {
                    plot.y.forEach(y => {
                        data.push({
                            x: telemetry[plot.x.axis],
                            y: telemetry[y.axis],
                            mode: 'lines',
                            name: stageToPlot.displayName + ' ' + y.axis
                        });
                    });
                }

                const events = stageTrajectories[0].events;
                if (plot.events && events !== undefined) {
                    plot.y.forEach(y => {
                        data.push({
                            x: events[plot.x.axis],
                            y: events[y.axis],
                            mode: 'markers',
                        });
                    });
                }

            });
        });

        return data;
    }

    makeGridPlot(plot) {

        const layout = this.getLayout(plot);
        const data = this.buildPlotData(plot);

        Plotly.plot(plot.id, data, layout);
    }

    resize(plot) {
        Plotly.relayout(plot.id, {});
    }

}
