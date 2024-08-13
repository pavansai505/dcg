import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardApprovalCardsComponent } from './course-card-approval-cards.component';

describe('CourseCardApprovalCardsComponent', () => {
  let component: CourseCardApprovalCardsComponent;
  let fixture: ComponentFixture<CourseCardApprovalCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardApprovalCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCardApprovalCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
