package com.dcg.mvc.badge;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"course", "users"})
@Entity
public class Badge extends BaseEntity {

    private String badgeName;
    private String badgeDescription;
    private String badgeIcon;

    @OneToOne
    @JoinColumn(name = "course_id", unique = true)
    @JsonIgnore
    private Course course;

    @ManyToMany(mappedBy = "badges")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    private boolean acquired;

    @PrePersist
    private void setDefaultAcquiredStatus() {
        this.acquired = false;
    }

    public void acquireBadge() {
        this.acquired = true;
    }

    public void addUser(User user) {
        this.users.add(user);
        user.getBadges().add(this);
    }

    public void removeUser(User user) {
        this.users.remove(user);
        user.getBadges().remove(this);
    }
}
