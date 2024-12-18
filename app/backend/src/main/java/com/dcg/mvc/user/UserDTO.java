package com.dcg.mvc.user;

import com.dcg.mvc.history.CourseActionHistory;
import com.dcg.mvc.role.RoleDTO;
import com.dcg.mvc.course.CourseDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String fullName;
    private LocalDate dateOfBirth;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private LocalDateTime nameLastModifiedDate;
    private boolean disabled;
    private List<RoleDTO> roles;
    private String imageUrl;
    @JsonIgnoreProperties({"badge","units","histories","quiz","users"})
    private List<CourseDTO> courses;
    private boolean subscribeToEmail;

}
