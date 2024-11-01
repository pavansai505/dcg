import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeleteLecturesComponent } from './instructor-delete-lectures.component';

describe('InstructorDeleteLecturesComponent', () => {
  let component: InstructorDeleteLecturesComponent;
  let fixture: ComponentFixture<InstructorDeleteLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDeleteLecturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorDeleteLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
