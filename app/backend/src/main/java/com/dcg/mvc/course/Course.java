package com.dcg.mvc.course;

import com.dcg.common.BaseEntity;
import com.dcg.constants.enums.CourseLevel;
import com.dcg.mvc.badge.Badge;
import com.dcg.mvc.history.CourseActionHistory;
import com.dcg.mvc.payment.Payment;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"user", "histories", "units", "courseProgresses"})
@Entity
public class Course extends BaseEntity {

    private String title;
    private String authorName;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @Column(columnDefinition = "LONGTEXT")
    private String synopsis;
    private String courseCover;
    private double price;

    @ManyToMany(mappedBy = "courses", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<User> user = new ArrayList<>();

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CourseActionHistory> histories = new ArrayList<>();

    @JsonIgnoreProperties("course")
    @OneToMany(mappedBy = "course", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("id ASC")
    private Set<Unit> units;

    private String approvalStatus;

    @Column(unique = true, nullable = false)
    private String courseCode;

    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @JsonIgnoreProperties("course")
    private Badge badge;

    @Enumerated(EnumType.STRING)
    private CourseLevel courseLevel;

    @ElementCollection
    @CollectionTable(name = "course_tags", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "course_end_goals", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "end_goal")
    private List<String> endGoals = new ArrayList<>();

    @PrePersist
    private void generateCourseCode() {
        if (this.courseCode == null) {
            this.courseCode = generateUniqueHashCode();
        }
    }
    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Payment> payments = new ArrayList<>();

    private String generateUniqueHashCode() {
        try {
            String data = title + authorName + System.currentTimeMillis();
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating hash code for course", e);
        }
    }

    // Utility methods for managing bidirectional relationships
    public void addUser(User user) {
        if (user != null && !this.user.contains(user)) {
            this.user.add(user);
            user.getCourses().add(this);
        }
    }

    public void removeUser(User user) {
        this.user.remove(user);
        user.getCourses().remove(this);
    }
    public void addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setCourse(this); // Ensure bidirectional relationship is maintained
    }

    public void removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setCourse(null); // Ensure bidirectional relationship is maintained
    }
}
