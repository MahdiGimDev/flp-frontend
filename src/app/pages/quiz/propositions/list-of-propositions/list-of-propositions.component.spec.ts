import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPropositionsComponent } from './list-of-propositions.component';

describe('ListOfPropositionsComponent', () => {
  let component: ListOfPropositionsComponent;
  let fixture: ComponentFixture<ListOfPropositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfPropositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPropositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
