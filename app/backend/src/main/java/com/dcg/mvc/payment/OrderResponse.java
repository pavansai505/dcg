package com.dcg.mvc.payment;


import lombok.Data;

@Data
public class OrderResponse {

    String secretKey;
    String razorpayOrderId;
    String applicationFee;
    String secretId;
    String courseTitle;
    String email;


}

