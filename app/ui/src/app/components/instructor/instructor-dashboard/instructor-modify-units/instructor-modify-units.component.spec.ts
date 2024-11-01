import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorModifyUnitsComponent } from './instructor-modify-units.component';

describe('InstructorModifyUnitsComponent', () => {
  let component: InstructorModifyUnitsComponent;
  let fixture: ComponentFixture<InstructorModifyUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorModifyUnitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorModifyUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
