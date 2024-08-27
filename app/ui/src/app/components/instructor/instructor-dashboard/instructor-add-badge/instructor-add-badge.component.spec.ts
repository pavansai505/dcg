import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddBadgeComponent } from './instructor-add-badge.component';

describe('InstructorAddBadgeComponent', () => {
  let component: InstructorAddBadgeComponent;
  let fixture: ComponentFixture<InstructorAddBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorAddBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorAddBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
