import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationDetailComponent } from './vacation-detail.component';

describe('VacationDetailComponent', () => {
  let component: VacationDetailComponent;
  let fixture: ComponentFixture<VacationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
