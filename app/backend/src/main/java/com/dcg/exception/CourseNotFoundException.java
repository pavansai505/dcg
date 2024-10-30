package com.dcg.exception;

public class CourseNotFoundException extends RuntimeException{
     public CourseNotFoundException(String message) {
        super(message);
    }
}
