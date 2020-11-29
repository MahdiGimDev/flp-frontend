import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropositionComponent } from './create-proposition.component';

describe('CreatePropositionComponent', () => {
  let component: CreatePropositionComponent;
  let fixture: ComponentFixture<CreatePropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
