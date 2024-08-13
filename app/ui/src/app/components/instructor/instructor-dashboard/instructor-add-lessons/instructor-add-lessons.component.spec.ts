import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddLessonsComponent } from './instructor-add-lessons.component';

describe('InstructorAddLessonsComponent', () => {
  let component: InstructorAddLessonsComponent;
  let fixture: ComponentFixture<InstructorAddLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorAddLessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorAddLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
