package com.dcg.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardStats {
    private int userCount;
    private int courseCount;
    private int registrationsCount;
    private int salesCount;
}
