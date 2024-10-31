import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeleteUnitsComponent } from './instructor-delete-units.component';

describe('InstructorDeleteUnitsComponent', () => {
  let component: InstructorDeleteUnitsComponent;
  let fixture: ComponentFixture<InstructorDeleteUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDeleteUnitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorDeleteUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
