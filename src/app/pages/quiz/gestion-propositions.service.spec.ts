import { TestBed } from '@angular/core/testing';

import { GestionPropositionsService } from './gestion-propositions.service';

describe('GestionPropositionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionPropositionsService = TestBed.get(GestionPropositionsService);
    expect(service).toBeTruthy();
  });
});
