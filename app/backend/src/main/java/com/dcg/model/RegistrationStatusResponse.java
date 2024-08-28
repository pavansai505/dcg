package com.dcg.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RegistrationStatusResponse {
    private Long courseId;
    private String courseCode;
    private boolean isRegistered;
}