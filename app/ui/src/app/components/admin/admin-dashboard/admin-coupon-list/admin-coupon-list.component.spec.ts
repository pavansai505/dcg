import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponListComponent } from './admin-coupon-list.component';

describe('AdminCouponListComponent', () => {
  let component: AdminCouponListComponent;
  let fixture: ComponentFixture<AdminCouponListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCouponListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCouponListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
