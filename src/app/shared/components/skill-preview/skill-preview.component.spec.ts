import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPreviewComponent } from './skill-preview.component';

describe('SkillPreviewComponent', () => {
  let component: SkillPreviewComponent;
  let fixture: ComponentFixture<SkillPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
