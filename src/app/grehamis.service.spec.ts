import { TestBed } from '@angular/core/testing';

import { GrehamisService } from './grehamis.service';

describe('GrehamisService', () => {
  let service: GrehamisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrehamisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
