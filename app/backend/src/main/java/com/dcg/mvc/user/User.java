package com.dcg.mvc.user;

import com.dcg.mvc.badge.Badge;
import com.dcg.mvc.contest.Contest;
import com.dcg.mvc.coupon.Coupon;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.history.CourseActionHistory;
import com.dcg.mvc.lectureProgress.LectureProgress;
import com.dcg.mvc.payment.Payment;
import com.dcg.mvc.role.Role;
import com.dcg.mvc.score.Score;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
@ToString(exclude = {"roles", "courses", "histories", "badges", "lectureProgresses"})
public class User implements UserDetails, Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    @Column(unique = true)
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Role> roles;
    @Column(name = "image_url", nullable = true) // Field to store the image URL
    private String imageUrl; // This field can be null by default
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("user")
    @JsonIgnore
    private List<Course> courses = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("user")
    @JsonIgnore
    private List<LectureProgress> lectureProgresses = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_badge",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "badge_id")
    )
    @JsonIgnoreProperties("users")
    private Set<Badge> badges = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CourseActionHistory> histories = new ArrayList<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @Column(nullable = true)
    private LocalDateTime nameLastModifiedDate;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private boolean disabled;

    public String getFullName() {
        return firstName + " " + lastName;
    }
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Payment> payments = new ArrayList<>();

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("createdBy")
    @JsonIgnore
    private List<Contest> createdContests = new ArrayList<>();

    @ManyToMany(mappedBy = "participants")
    @JsonIgnoreProperties("participants")
    @JsonIgnore
    private List<Contest> contests = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("user")
    @JsonIgnore
    private List<Score> scores; // Scores achieved by the user in various quizzes

    @Column(name = "subscribe_to_email", nullable = false, columnDefinition = "boolean default false") // New field
    private boolean subscribeToEmail = false; // Default value set to false

    @ManyToMany
    @JoinTable(
            name = "user_coupon",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "coupon_id")
    )
    @JsonIgnoreProperties("users")
    @Column(nullable = true) // This allows the column to be null in the database
    @JsonIgnore
    private Set<Coupon> couponsUsed = new HashSet<>(); // Initialize to an empty set


    // Existing methods...

    public void addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setUser(this); // Ensure bidirectional relationship is maintained
    }

    public void removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setUser(null); // Ensure bidirectional relationship is maintained
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return email;
    }

    // Utility methods for managing bidirectional relationships
    public void addCourse(Course course) {
        this.courses.add(course);
        course.getUser().add(this);
    }

    public void removeCourse(Course course) {
        this.courses.remove(course);
        course.getUser().remove(this);
    }

    public void addBadge(Badge badge) {
        this.badges.add(badge);
        badge.getUsers().add(this);
    }

    public void removeBadge(Badge badge) {
        this.badges.remove(badge);
        badge.getUsers().remove(this);
    }
}
