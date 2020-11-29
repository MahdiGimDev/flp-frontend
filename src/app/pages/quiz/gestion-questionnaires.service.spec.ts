import { TestBed } from '@angular/core/testing';

import { GestionQuestionnairesService } from './gestion-questionnaires.service';

describe('GestionQuestionnairesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionQuestionnairesService = TestBed.get(GestionQuestionnairesService);
    expect(service).toBeTruthy();
  });
});
