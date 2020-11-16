import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {JobsCreateComponent } from './jobs-create.component';

describe('JobsCreateComponent', () => {
  let component: JobsCreateComponent;
  let fixture: ComponentFixture<JobsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
