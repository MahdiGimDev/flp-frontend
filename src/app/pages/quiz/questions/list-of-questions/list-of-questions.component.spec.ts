import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfQuestionsComponent } from './list-of-questions.component';

describe('ListOfQuestionsComponent', () => {
  let component: ListOfQuestionsComponent;
  let fixture: ComponentFixture<ListOfQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
