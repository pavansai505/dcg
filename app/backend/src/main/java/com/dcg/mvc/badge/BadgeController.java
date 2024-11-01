package com.dcg.mvc.badge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
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

    @PutMapping("/assign/{courseId}")
    public ResponseEntity<Badge> assignBadge(@PathVariable Long courseId) {
        Badge badge1 = badgeService.awardBadgesByCourseId(courseId);
        return new ResponseEntity<>(badge1, HttpStatus.OK);
    }

    /**
     * Retrieves all badges for a specific course.
     *
     * @param courseId The ID of the course.
     * @return ResponseEntity containing a set of badges for the course.
     */
    @GetMapping("/course/{courseId}")
    public ResponseEntity<Badge> getBadgesByCourseId(@PathVariable Long courseId) {
        Badge badge = badgeService.getBadgesByCourseId(courseId);
        return new ResponseEntity<>(badge, HttpStatus.OK);
    }

    /**
     * Awards badges for a given course ID to the currently authenticated user.
     *
     * @param courseId The ID of the course for which badges should be awarded.
     * @return ResponseEntity with no content.
     */
    @PostMapping("/award/course/{courseId}")
    public ResponseEntity<Badge> awardBadgesByCourseId(@PathVariable Long courseId) {
        return new ResponseEntity<>(badgeService.awardBadgesByCourseId(courseId), HttpStatus.OK);
    }

    @PostMapping("{id}/image")
    public ResponseEntity<Map<String, String>> uploadImage(@PathVariable Long id,
            @RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            String imageUrl = badgeService.uploadCourseImage(

                    id,
                    file);

            // Wrap the imageUrl in a Map for a proper JSON response
            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", imageUrl); // Assuming `imageUrl` is the filename

            return ResponseEntity.ok(response); // Return the JSON response
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error uploading image: " + e.getMessage()));
        }

    }

}
