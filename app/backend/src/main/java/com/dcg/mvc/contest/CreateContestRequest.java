package com.dcg.mvc.contest.dto;

import com.dcg.mvc.question.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime; // Import LocalDateTime for date-time fields
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateContestRequest {

    private String title;
    private String description;
    private String status;
    private int maxParticipants;
    private Long createdByUserId;
    private List<Question> questions;
    private LocalDateTime startDate; // New field for the contest start date
    private LocalDateTime endDate;   // New field for the contest end date

}
