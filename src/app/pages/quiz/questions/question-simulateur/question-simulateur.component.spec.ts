import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSimulateurComponent } from './question-simulateur.component';

describe('QuestionSimulateurComponent', () => {
  let component: QuestionSimulateurComponent;
  let fixture: ComponentFixture<QuestionSimulateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSimulateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSimulateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
