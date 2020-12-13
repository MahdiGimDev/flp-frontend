import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifCreateComponent } from './certif-create.component';

describe('CertifCreateComponent', () => {
  let component: CertifCreateComponent;
  let fixture: ComponentFixture<CertifCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
