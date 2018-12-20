import { TestBed } from '@angular/core/testing';

import { LoadScreenService } from './load-screen.service';

describe('LoadScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadScreenService = TestBed.get(LoadScreenService);
    expect(service).toBeTruthy();
  });
});
