import { Injectable } from '@angular/core';

import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartJsService {

  constructor() {
    Chart.defaults.global.defaultFontColor = 'white';
  }

  buildChart(placeholder: string, data: any, options: any): Chart {

    return new Chart(placeholder, {
          type: 'scatter',
          data: data,
          options: options
    });

  }
}
