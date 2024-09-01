package com.dcg.mvc.contest.controller;

import com.dcg.model.CustomResponse;
import com.dcg.mvc.contest.Contest;
import com.dcg.mvc.contest.ContestService;
import com.dcg.mvc.contest.dto.CreateContestRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/contest")
public class ContestController {

    @Autowired
    private ContestService contestService;

    @PostMapping
    public ResponseEntity<Contest> createContest(@RequestBody CreateContestRequest request, Authentication authentication) {
        Contest contest = contestService.createContest(request,((UserDetails) authentication.getPrincipal()).getUsername());
        return ResponseEntity.ok(contest);
    }


    @GetMapping("get/valid")
    public List<Contest> getAllNonExpiredContests() {
        return contestService.getAllContests().stream()
                .filter(contest -> contest.getEndDate() != null && !contest.getEndDate().isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());
    }
    @GetMapping("get/started")
    public List<Contest> getAllNonExpiredAndStartedContests() {
        return contestService.getAllContests().stream()
                .filter(contest -> contest.getEndDate() != null && !contest.getEndDate().isBefore(LocalDateTime.now()) && contest.getStartDate() != null && contest.getStartDate().isBefore(LocalDateTime.now()) )
                .collect(Collectors.toList());
    }
    @GetMapping("get")
    public List<Contest> getAllContests() {

        return contestService.getAllContests();
    }
    @GetMapping("get/{id}")
    public Contest getContestById(@PathVariable Long id) {
        return contestService.getContestById(id);
    }
    @PostMapping("/{contestId}/register")
    public void registerForContest(@PathVariable Long contestId,Authentication authentication) {
        contestService.registerUserForContest(contestId, ((UserDetails) authentication.getPrincipal()).getUsername());
    }
    @GetMapping("/{contestId}/is-user-registered")
    public CustomResponse isUserRegisteredForContest(@PathVariable Long contestId, Authentication authentication) {
        return CustomResponse.builder().isResultTrue(contestService.isUserRegisteredForContest(contestId, ((UserDetails) authentication.getPrincipal()).getUsername())
    ).build();
    }
}
