package com.dcg.mvc.badge;

import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.course.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    /**
     * Retrieves all badges.
     *
     * @return A set of all badges.
     */
    public Set<Badge> getAllBadges() {
        return Set.copyOf(badgeRepository.findAll());
    }

    /**
     * Retrieves all badges associated with the currently authenticated user.
     *
     * @return A set of badges associated with the user.
     */
    public Set<Badge> getBadgesForAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the currently authenticated username

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return badgeRepository.findBadgesByUsersId(user.getId());
    }

    /**
     * Creates a new badge for a given course.
     *
     * @param request The request object containing badge details.
     * @return The created Badge entity.
     */
    public Badge createOrUpdateBadge(CreateBadgeRequest request) {
        Course course;
        // Find the course by ID
        if(request.getCourseId()!=null){
             course = courseRepository.findById(request.getCourseId())
                    .orElse(null);
        }else{
            course=null;
        }

        // Attempt to find an existing badge for this course
        Badge badge = badgeRepository.findByCourseId(request.getCourseId())
                .orElse(Badge.builder()
                        .course(course)
                        .build());

        // Update or set the badge details
        badge.setBadgeName(request.getBadgeName());
        badge.setBadgeDescription(request.getBadgeDescription());
        badge.setBadgeIcon(request.getBadgeIcon());

        // Save and return the badge (this will either create or update)
        return badgeRepository.save(badge);
    }


    /**
     * Retrieves all badges for a specific course.
     *
     * @param courseId The ID of the course.
     * @return A set of badges associated with the course.
     */
    public Badge getBadgesByCourseId(Long courseId) {
        return badgeRepository.findBadgesByCourseId(courseId);
    }

    /**
     * Awards badges for a given course ID to the currently authenticated user.
     *
     * @param courseId The ID of the course for which badges should be awarded.
     */
    public Badge awardBadgesByCourseId(Long courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the currently authenticated username

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Badge badge = badgeRepository.findBadgesByCourseId(courseId);
        System.out.println(badge.getUsers().contains(user));
            // Check if the badge is already acquired by the user
            if (!badge.getUsers().contains(user)) {
                badge.addUser(user); // Assuming Badge has an addUser method
                badge.acquireBadge(); // Optionally mark the badge as acquired
                System.out.println(badge);
                badgeRepository.save(badge);

                // Optionally update the user's badge list
                user.getBadges().add(badge);
                userRepository.save(user);
            }
            return badge;

    }
}
