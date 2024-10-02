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
