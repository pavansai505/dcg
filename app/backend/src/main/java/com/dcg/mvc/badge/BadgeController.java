package com.dcg.mvc.badge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/badges")
public class BadgeController {

    @Autowired
    private BadgeService badgeService;

    /**
     * Retrieves all badges.
     *
     * @return ResponseEntity containing a set of all badges.
     */
    @GetMapping
    public ResponseEntity<Set<Badge>> getAllBadges() {
        Set<Badge> badges = badgeService.getAllBadges();
        return new ResponseEntity<>(badges, HttpStatus.OK);
    }

    /**
     * Retrieves all badges associated with the currently authenticated user.
     *
     * @return ResponseEntity containing a set of badges for the authenticated user.
     */
    @GetMapping("/user")
    public ResponseEntity<Set<Badge>> getBadgesForAuthenticatedUser() {
        Set<Badge> badges = badgeService.getBadgesForAuthenticatedUser();
        return new ResponseEntity<>(badges, HttpStatus.OK);
    }

    /**
     * Creates a new badge for a given course.
     *
     * @param request The request object containing badge details.
     * @return ResponseEntity containing the created Badge entity.
     */
    @PostMapping
    public ResponseEntity<Badge> createBadge(@RequestBody CreateBadgeRequest request) {
        Badge badge = badgeService.createOrUpdateBadge(request);
        return new ResponseEntity<>(badge, HttpStatus.CREATED);
    }

    /**
     * Retrieves all badges for a specific course.
     *
     * @param courseId The ID of the course.
     * @return ResponseEntity containing a set of badges for the course.
     */
    @GetMapping("/course/{courseId}")
    public ResponseEntity<Set<Badge>> getBadgesByCourseId(@PathVariable Long courseId) {
        Set<Badge> badges = badgeService.getBadgesByCourseId(courseId);
        return new ResponseEntity<>(badges, HttpStatus.OK);
    }

    /**
     * Awards badges for a given course ID to the currently authenticated user.
     *
     * @param courseId The ID of the course for which badges should be awarded.
     * @return ResponseEntity with no content.
     */
    @PostMapping("/award/course/{courseId}")
    public ResponseEntity<Void> awardBadgesByCourseId(@PathVariable Long courseId) {
        badgeService.awardBadgesByCourseId(courseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
