import { TestBed } from '@angular/core/testing';

import { BatsService } from './bats.service';

describe('BatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatsService = TestBed.get(BatsService);
    expect(service).toBeTruthy();
  });
});
