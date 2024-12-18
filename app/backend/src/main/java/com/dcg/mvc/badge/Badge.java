package com.dcg.mvc.badge;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.course.Course;
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

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
    @Column(columnDefinition = "VARCHAR(36) DEFAULT ''") // Use VARCHAR for string type with default empty string
    private String badgeCode; // Nullable by default


    @OneToOne
    @JoinColumn(name = "course_id", unique = true)
//    @JsonIgnore
    private Course course;

    @ManyToMany(mappedBy = "badges")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    private boolean acquired;
    @Column(name = "image_url", nullable = true) // Field to store the image URL
    private String imageUrl; // This field can be null by default
    @PrePersist
    private void setDefaultAcquiredStatus() {
        this.acquired = false;
        this.badgeCode = UUID.randomUUID().toString();
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
