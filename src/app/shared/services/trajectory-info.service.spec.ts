import { TestBed } from '@angular/core/testing';

import { TrajectoryInfoService } from './trajectory-info.service';

describe('TrajectoryInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrajectoryInfoService = TestBed.get(TrajectoryInfoService);
    expect(service).toBeTruthy();
  });
});
