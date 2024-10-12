package com.dcg.mvc.history;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryUpdate {
    private Long courseId;
    private int percentage;
}
