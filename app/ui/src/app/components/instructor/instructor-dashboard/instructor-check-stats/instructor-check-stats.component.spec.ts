import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCheckStatsComponent } from './instructor-check-stats.component';

describe('InstructorCheckStatsComponent', () => {
  let component: InstructorCheckStatsComponent;
  let fixture: ComponentFixture<InstructorCheckStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorCheckStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorCheckStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
