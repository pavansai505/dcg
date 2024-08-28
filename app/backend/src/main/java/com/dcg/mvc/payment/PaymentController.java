package com.dcg.mvc.payment;

import com.dcg.model.CustomResponse;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import com.dcg.services.EmailService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private RazorpayClient razorpayClient;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    EmailService emailService;

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
    public ResponseEntity<CustomResponse> verifyPayment(@RequestBody Map<String, String> data, Authentication authentication) {
        String razorpayOrderId = data.get("razorpay_order_id");
        String razorpayPaymentId = data.get("razorpay_payment_id");
        String razorpaySignature = data.get("razorpay_signature");
        String courseIdStr = data.get("course_id"); // Assume you get course ID in the request


        try {
            boolean isValid = verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

            if (isValid) {
                // Fetch user and course
                User user = userRepository.findByEmail(((UserDetails) authentication.getPrincipal()).getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found"));
                Course course = courseRepository.findByCourseCode((String) data.get("courseCode"))
                        .orElseThrow(() -> new RuntimeException("Course not found"));

                // Create a payment record
                Payment payment = Payment.builder()
                        .paymentId(razorpayPaymentId)
                        .orderId(razorpayOrderId)
                        .amount(course.getPrice()) // Set the actual amount here
                        .status("success")
                        .user(user)
                        .course(course)
                        .build();

                // Save payment and update user and course
                paymentRepository.save(payment);
                user.addPayment(payment);
                course.addPayment(payment);
                userRepository.save(user);
                courseRepository.save(course);

                // Send payment details email
                emailService.sendPaymentDetailsEmail(user.getEmail(), razorpayPaymentId, razorpayOrderId, payment.getAmount(), "Successful");
                return ResponseEntity.ok(CustomResponse.builder().message("Payment successful!").build());
            } else {
                return ResponseEntity.ok(CustomResponse.builder().message("Payment failed due to invalid signature!").build());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CustomResponse.builder().message("Payment verification failed!").build());
        }
    }

    // Utility method to verify payment signature
    private boolean verifySignature(String orderId, String paymentId, String signature) throws RazorpayException {
        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", orderId);
        options.put("razorpay_payment_id", paymentId);
        options.put("razorpay_signature", signature);
        return Utils.verifyPaymentSignature(options, SECRET_KEY1); // Ensure SECRET_KEY1 is set correctly
    }



}
