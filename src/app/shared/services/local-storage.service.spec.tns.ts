import { TestBed } from '@angular/core/testing';

import { MobileStorageService } from './mobile-storage.service';

describe('MobileStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileStorageService = TestBed.get(MobileStorageService);
    expect(service).toBeTruthy();
  });
});
