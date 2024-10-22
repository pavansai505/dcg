import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCouponComponent } from './admin-coupon.component';

describe('AdminCouponComponent', () => {
  let component: AdminCouponComponent;
  let fixture: ComponentFixture<AdminCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCouponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
