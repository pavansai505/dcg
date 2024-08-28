package com.dcg.mvc.payment;

import com.dcg.model.CustomResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private RazorpayClient razorpayClient;

    private static final String SECRET_ID1 = "rzp_test_eDyZOTC4Wvj4LH";
    private static final String SECRET_KEY1 = "OtmkvEzptX0Yu6xUK6DDR6Cj";
    public PaymentController() throws RazorpayException {
        this.razorpayClient = new RazorpayClient(SECRET_ID1, SECRET_KEY1);
    }

    // Endpoint to create an order
    @PostMapping("/createOrder")
    public String createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        int amount =(int) Double.parseDouble(data.get("amount").toString()) * 100; // Converting amount to paisa
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_123456");

        Order order = razorpayClient.orders.create(orderRequest);
        return order.toString();
    }

    @PostMapping("/verifyPayment")
    public ResponseEntity<CustomResponse> verifyPayment(@RequestBody Map<String, String> data) {
        String razorpayOrderId = data.get("razorpay_order_id");
        String razorpayPaymentId = data.get("razorpay_payment_id");
        String razorpaySignature = data.get("razorpay_signature");

        try {
            boolean isValid = verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
            if (isValid) {
                return ResponseEntity.ok(CustomResponse.builder().message("Payment successful!").build());
            } else {
                return ResponseEntity.ok(CustomResponse.builder().message("Payment failed here!").build());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.ok(CustomResponse.builder().message("Payment failed!").build());
        }
    }

    // Utility method to verify payment signature
    private boolean verifySignature(String orderId, String paymentId, String signature) throws RazorpayException {
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", orderId);
        options.put("razorpay_payment_id", paymentId);
        options.put("razorpay_signature", signature);
        return Utils.verifyPaymentSignature(options,SECRET_KEY1);
    }


}
