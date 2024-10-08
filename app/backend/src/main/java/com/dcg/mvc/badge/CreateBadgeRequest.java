package com.dcg.mvc.badge;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBadgeRequest {

    private Long courseId;
    private String badgeName;
    private String badgeDescription;
    private String badgeIcon;

}
