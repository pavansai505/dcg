package com.dcg.mvc.course;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.badge.Badge;
import com.dcg.mvc.lectureProgress.LectureProgress;
import com.dcg.mvc.history.CourseActionHistory;
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
    private String description;
    private String synopsis;
    private String courseCover;
    private double price;

    @ManyToMany(mappedBy = "courses", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<User> user = new ArrayList<>();

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
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


    @PrePersist
    private void generateCourseCode() {
        if (this.courseCode == null) {
            this.courseCode = generateUniqueHashCode();
        }
    }

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
}
