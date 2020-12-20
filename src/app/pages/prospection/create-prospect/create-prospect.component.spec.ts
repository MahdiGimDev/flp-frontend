import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProspectComponent } from './create-prospect.component';

describe('CreateProspectComponent', () => {
  let component: CreateProspectComponent;
  let fixture: ComponentFixture<CreateProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
