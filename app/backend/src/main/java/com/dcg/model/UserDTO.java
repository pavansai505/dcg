package com.dcg.model;

import com.dcg.mvc.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String fullName;
    private LocalDate dateOfBirth;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private List<RoleDTO> roles;
    private List<CourseDTO> courses;

    // Constructor, getters, and setters

    public UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setCreatedDate(user.getCreatedDate());
        dto.setLastModifiedDate(user.getLastModifiedDate());

        // Convert roles
        List<RoleDTO> roles = user.getRoles().stream()
                .map(role -> new RoleDTO(role.getId(), role.getName()))
                .collect(Collectors.toList());
        dto.setRoles(roles);

        // Convert courses
        List<CourseDTO> courses = user.getCourses().stream()
                .map(course -> new CourseDTO(course.getId(), course.getTitle()))
                .collect(Collectors.toList());
        dto.setCourses(courses);

        return dto;
    }


}
