import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesViewComponent } from './admin-courses-view.component';

describe('AdminCoursesViewComponent', () => {
  let component: AdminCoursesViewComponent;
  let fixture: ComponentFixture<AdminCoursesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCoursesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCoursesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
