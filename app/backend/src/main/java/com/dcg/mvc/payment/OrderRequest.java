package com.dcg.mvc.payment;


import lombok.Data;

import java.math.BigInteger;

@Data
public class OrderRequest {

    String customerName;
    String email;
    String phoneNumber;
    BigInteger amount;


}
