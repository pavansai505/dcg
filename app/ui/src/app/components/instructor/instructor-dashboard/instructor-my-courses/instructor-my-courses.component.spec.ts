import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorMyCoursesComponent } from './instructor-my-courses.component';

describe('InstructorMyCoursesComponent', () => {
  let component: InstructorMyCoursesComponent;
  let fixture: ComponentFixture<InstructorMyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorMyCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorMyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
