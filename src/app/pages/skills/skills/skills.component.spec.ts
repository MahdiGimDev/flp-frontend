import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsCreateComponent } from './skills.component';



describe('SkillsComponent', () => {
  let component: SkillsCreateComponent;
  let fixture: ComponentFixture<SkillsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
