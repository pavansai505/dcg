import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CouponService } from '../../../../services/coupon/coupon.service';

@Component({
  selector: 'app-admin-coupon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules for standalone component
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css'] // Corrected "styleUrl" to "styleUrls"
})
export class AdminCouponComponent implements OnInit {
  couponForm!: FormGroup;

  constructor(private fb: FormBuilder,private couponService:CouponService) {}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: ['', Validators.required],
      percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      totalUses: [1, [Validators.required, Validators.min(1)]],
      expiryDate: ['', Validators.required],
      active: [true]
    });
    this.couponForm.get('code')?.valueChanges.subscribe(value => {
      if (value) {
        this.couponForm.get('code')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  onSubmit(): void {
    if (this.couponForm.valid) {
      console.log('Form Submitted:', this.couponForm.value);
      this.couponService.createCoupon(this.couponForm.value).subscribe({
        next: (response) => {
          console.log('Coupon created successfully:', response);
          // Optionally navigate to another route or show a success message
          // this.router.navigate(['/coupons']); // Adjust the route as needed
        },
        error: (error) => {
          console.error('Error creating coupon:', error);
          // Optionally show an error message to the user
        }
      });
    }
  }
}
