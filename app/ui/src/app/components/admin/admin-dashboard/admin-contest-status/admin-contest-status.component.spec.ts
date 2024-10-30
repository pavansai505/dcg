import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContestStatusComponent } from './admin-contest-status.component';

describe('AdminContestStatusComponent', () => {
  let component: AdminContestStatusComponent;
  let fixture: ComponentFixture<AdminContestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContestStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminContestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
