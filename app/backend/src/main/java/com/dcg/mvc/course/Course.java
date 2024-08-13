package com.dcg.mvc.course;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.courseProgress.CourseProgress;
import com.dcg.mvc.history.CourseActionHistory;
import com.dcg.mvc.unit.Unit;
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

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
    private List<User> user;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<CourseActionHistory> histories;

    @JsonIgnoreProperties("course")
    @OneToMany(mappedBy = "course", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Unit> units;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<CourseProgress> courseProgresses;

    private String approvalStatus;

    // Utility methods for managing bidirectional relationships
    public void addUser(User user) {
        this.user.add(user);
        user.getCourses().add(this);
    }

    public void removeUser(User user) {
        this.user.remove(user);
        user.getCourses().remove(this);
    }
}
