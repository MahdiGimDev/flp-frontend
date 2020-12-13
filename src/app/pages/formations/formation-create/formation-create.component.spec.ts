import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationCreateComponent } from './formation-create.component';

describe('FormationCreateComponent', () => {
  let component: FormationCreateComponent;
  let fixture: ComponentFixture<FormationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
