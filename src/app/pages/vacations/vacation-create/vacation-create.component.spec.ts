import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationCreateComponent } from './vacation-create.component';

describe('VacationCreateComponent', () => {
  let component: VacationCreateComponent;
  let fixture: ComponentFixture<VacationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
