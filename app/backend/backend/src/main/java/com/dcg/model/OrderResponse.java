package com.dcg.model;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class OrderResponse {

    String secretKey;
    String razorpayOrderId;
    String applicationFee;
    String secretId;
    String courseTitle;
    String email;


}

