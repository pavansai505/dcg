export interface Payment {
    id?: number; // Optional: Identifier for the payment
    paymentId: string; // Payment ID from Razorpay
    orderId: string; // Order ID associated with this payment
    amount: number; // Payment amount
    status: string; // Payment status (e.g., "success", "failed")
    userId: number; // ID of the user associated with the payment
    courseId: number; // ID of the course being purchased
    couponId?: number; // Optional: ID of the coupon applied in the payment
}

// payment.dto.ts

export interface PaymentDTO {
    paymentId: string; // Payment ID from Razorpay
    orderId: string; // Order ID associated with this payment
    amount: number; // Payment amount
    status: string; // Payment status (e.g., "success", "failed")
    userId: number; // ID of the user
    userName: string; // Username of the user
    courseId?: number; // ID of the course being purchased (optional)
    courseTitle?: string; // Title of the course (optional)
    courseAuthor?: string; // Author of the course (optional)
    couponId?: number; // ID of the coupon applied in the payment, if any (optional)
    couponName:string;
    percentage:number
  }
  