package com.dcg.mvc.contest;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ContestStatusScheduler {

    private final ContestRepository contestRepository;

    public ContestStatusScheduler(ContestRepository contestRepository) {
        this.contestRepository = contestRepository;
    }

    @Scheduled(cron = "0 0 0/3 * * ?") // Run every 3 hours
    @Transactional
    public void updateContestStatuses() {
        LocalDateTime now = LocalDateTime.now();
        contestRepository.updateContestStatuses(now); // Executes the batch update query
    }

}
