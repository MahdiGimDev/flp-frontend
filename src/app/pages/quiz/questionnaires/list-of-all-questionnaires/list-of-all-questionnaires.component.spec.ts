import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAllQuestionnairesComponent } from './list-of-all-questionnaires.component';

describe('ListOfAllQuestionnairesComponent', () => {
  let component: ListOfAllQuestionnairesComponent;
  let fixture: ComponentFixture<ListOfAllQuestionnairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfAllQuestionnairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAllQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
