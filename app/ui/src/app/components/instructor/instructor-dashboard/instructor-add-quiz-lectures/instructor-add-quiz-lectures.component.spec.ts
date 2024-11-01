import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddQuizLecturesComponent } from './instructor-add-quiz-lectures.component';

describe('InstructorAddQuizLecturesComponent', () => {
  let component: InstructorAddQuizLecturesComponent;
  let fixture: ComponentFixture<InstructorAddQuizLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorAddQuizLecturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorAddQuizLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
