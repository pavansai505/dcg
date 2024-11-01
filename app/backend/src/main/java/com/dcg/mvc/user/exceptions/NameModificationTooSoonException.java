package com.dcg.mvc.user.exceptions;

public class NameModificationTooSoonException extends RuntimeException {
    public NameModificationTooSoonException(String message) {
        super(message);
    }
}