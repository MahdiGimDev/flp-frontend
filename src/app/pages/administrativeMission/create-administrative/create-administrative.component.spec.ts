import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministrativeComponent } from './create-administrative.component';

describe('CreateAdministrativeComponent', () => {
  let component: CreateAdministrativeComponent;
  let fixture: ComponentFixture<CreateAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdministrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
