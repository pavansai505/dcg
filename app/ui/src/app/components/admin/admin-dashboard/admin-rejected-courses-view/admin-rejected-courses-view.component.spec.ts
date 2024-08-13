import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRejectedCoursesViewComponent } from './admin-rejected-courses-view.component';

describe('AdminRejectedCoursesViewComponent', () => {
  let component: AdminRejectedCoursesViewComponent;
  let fixture: ComponentFixture<AdminRejectedCoursesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRejectedCoursesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRejectedCoursesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
