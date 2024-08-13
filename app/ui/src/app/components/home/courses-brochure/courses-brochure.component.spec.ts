import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBrochureComponent } from './courses-brochure.component';

describe('CoursesBrochureComponent', () => {
  let component: CoursesBrochureComponent;
  let fixture: ComponentFixture<CoursesBrochureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesBrochureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesBrochureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
