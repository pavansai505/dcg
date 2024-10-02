import { User } from "../user/user";

export interface Coupon {
    id?: number;              // Optional, for newly created coupons
    code: string;             // Unique coupon code
    percentage: number;       // Discount percentage
    totalUses: number;        // Total uses of this coupon
    expiryDate: string;       // Expiry date in ISO format
    users?: Set<User>;      // Users who have used this coupon (user IDs)
    payments?: Array<number>; // Payments where this coupon was applied (payment IDs)
    active: boolean;          // Indicates if the coupon is active
}
export interface CouponResponse {
    valid: boolean;         // Indicates if the coupon is valid
    discount?: number;      // Discount percentage if valid
    message: string;          // Message providing information about the coupon validity
}
