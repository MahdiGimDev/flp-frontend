import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionOfferViewComponent } from './mission-offer-view.component';

describe('MissionOfferViewComponent', () => {
  let component: MissionOfferViewComponent;
  let fixture: ComponentFixture<MissionOfferViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionOfferViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionOfferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
