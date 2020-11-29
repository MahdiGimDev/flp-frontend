import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurQuestionnaireComponent } from './simulateur-questionnaire.component';

describe('SimulateurQuestionnaireComponent', () => {
  let component: SimulateurQuestionnaireComponent;
  let fixture: ComponentFixture<SimulateurQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulateurQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateurQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
