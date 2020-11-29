import { TestBed } from '@angular/core/testing';

import { GestionQuestionService } from './gestion-question.service';

describe('GestionQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionQuestionService = TestBed.get(GestionQuestionService);
    expect(service).toBeTruthy();
  });
});
