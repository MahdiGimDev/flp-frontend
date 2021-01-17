import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizSessionComponent } from './add-quiz-session.component';

describe('AddQuizSessionComponent', () => {
  let component: AddQuizSessionComponent;
  let fixture: ComponentFixture<AddQuizSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuizSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
