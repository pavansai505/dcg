import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorModifyCourseComponent } from './instructor-modify-course.component';

describe('InstructorModifyCourseComponent', () => {
  let component: InstructorModifyCourseComponent;
  let fixture: ComponentFixture<InstructorModifyCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorModifyCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorModifyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
