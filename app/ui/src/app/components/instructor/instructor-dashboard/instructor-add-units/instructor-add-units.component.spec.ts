import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddUnitsComponent } from './instructor-add-units.component';

describe('InstructorAddUnitsComponent', () => {
  let component: InstructorAddUnitsComponent;
  let fixture: ComponentFixture<InstructorAddUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorAddUnitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorAddUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
