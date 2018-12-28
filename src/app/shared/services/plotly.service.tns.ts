import { Injectable } from '@angular/core';

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

    }

    makeGridPlot(plot) {

    }

    resize(plot) {
    }

}
