import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorModifyLecturesComponent } from './instructor-modify-lectures.component';

describe('InstructorModifyLecturesComponent', () => {
  let component: InstructorModifyLecturesComponent;
  let fixture: ComponentFixture<InstructorModifyLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorModifyLecturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorModifyLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
