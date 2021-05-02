import { TestBed } from '@angular/core/testing';

import { GestionLignesArretsService } from './gestion-lignes-arrets.service';

describe('GestionLignesArretsService', () => {
  let service: GestionLignesArretsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionLignesArretsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
