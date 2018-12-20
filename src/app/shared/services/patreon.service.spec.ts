import { TestBed } from '@angular/core/testing';

import { PatreonService } from './patreon.service';

describe('PatreonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatreonService = TestBed.get(PatreonService);
    expect(service).toBeTruthy();
  });
});
