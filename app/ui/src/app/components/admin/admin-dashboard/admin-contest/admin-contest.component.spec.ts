import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContestComponent } from './admin-contest.component';

describe('AdminContestComponent', () => {
  let component: AdminContestComponent;
  let fixture: ComponentFixture<AdminContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
