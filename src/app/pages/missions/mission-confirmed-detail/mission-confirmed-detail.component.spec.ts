import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionConfirmedDetailComponent } from './mission-confirmed-detail.component';

describe('MissionConfirmedDetailComponent', () => {
  let component: MissionConfirmedDetailComponent;
  let fixture: ComponentFixture<MissionConfirmedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionConfirmedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionConfirmedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
