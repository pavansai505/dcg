package com.dcg.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardStats {
    private Long userCount;
    private Long courseCount;
    private Long registrationsCount;
    private Long salesCount;
}
