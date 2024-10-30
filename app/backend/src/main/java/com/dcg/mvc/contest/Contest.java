package com.dcg.mvc.contest;

import com.dcg.common.BaseEntity;
import com.dcg.mvc.quiz.Quiz;
import com.dcg.mvc.score.Score; // Import Score entity
import com.dcg.mvc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Contest extends BaseEntity {

    private String title;

    @Column(length = 1000)
    private String description;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String status; // e.g., "UPCOMING", "ONGOING", "COMPLETED"

    private int maxParticipants;

    @ManyToOne
    @JoinColumn(name = "created_by_user")
    @JsonIgnoreProperties({"badges","authorities"})
    private User createdByUser;

    @ManyToMany
    @JoinTable(
            name = "contest_participants",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonIgnoreProperties({"badges","authorities"})
    private List<User> participants;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "id")
    private Quiz quiz; // Each contest has one associated quiz

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private boolean disabled;

    // Possibly not needed
    // @OneToMany(mappedBy = "contest", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Score> scores; // List of scores associated with the contest

}
