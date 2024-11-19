package com.dcg.mvc.faq;

import com.dcg.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
public class FAQ extends BaseEntity {
    private String question;
    @Column(columnDefinition = "LONGTEXT")
    private String answer;
    @Enumerated(EnumType.STRING)
    private Category category;
}

