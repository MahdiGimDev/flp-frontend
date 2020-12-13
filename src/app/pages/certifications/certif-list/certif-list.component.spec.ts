import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifListComponent } from './certif-list.component';

describe('CertifListComponent', () => {
  let component: CertifListComponent;
  let fixture: ComponentFixture<CertifListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
