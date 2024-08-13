import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesViewComponent } from './user-courses-view.component';

describe('UserCoursesViewComponent', () => {
  let component: UserCoursesViewComponent;
  let fixture: ComponentFixture<UserCoursesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoursesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCoursesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
