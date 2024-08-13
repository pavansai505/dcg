package com.dcg.model;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Data
public class OrderRequest {

    String customerName;
    String email;
    String phoneNumber;
    BigInteger amount;


}
