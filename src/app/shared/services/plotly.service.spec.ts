import { TestBed } from '@angular/core/testing';

import { PlotlyService } from './plotly.service';

describe('PlotlyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlotlyService = TestBed.get(PlotlyService);
    expect(service).toBeTruthy();
  });
});
