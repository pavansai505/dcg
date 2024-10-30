package com.dcg.mvc.contest;

public class ContestNotFoundException extends RuntimeException{
    ContestNotFoundException(String message){
        super(message);
    }
}
