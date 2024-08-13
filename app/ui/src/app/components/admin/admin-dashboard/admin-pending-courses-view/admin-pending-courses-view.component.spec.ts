import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingCoursesViewComponent } from './admin-pending-courses-view.component';

describe('AdminPendingCoursesViewComponent', () => {
  let component: AdminPendingCoursesViewComponent;
  let fixture: ComponentFixture<AdminPendingCoursesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPendingCoursesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPendingCoursesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
