package com.dcg.mvc.lecture;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LectureUpdateRequest {
    private String lessonTitle;
    private String lessonNotes;
    private String lessonVideo;
    private String code;
}
