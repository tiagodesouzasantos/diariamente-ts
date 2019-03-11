import { TestBed } from '@angular/core/testing';

import { SystemServerService } from './system-server.service';

describe('SystemServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemServerService = TestBed.get(SystemServerService);
    expect(service).toBeTruthy();
  });
});
