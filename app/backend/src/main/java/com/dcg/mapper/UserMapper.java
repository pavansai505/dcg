package com.dcg.mapper;

import com.dcg.model.UserDTO;
import com.dcg.model.RoleDTO;
import com.dcg.model.CourseDTO;
import com.dcg.mvc.user.User;
import com.dcg.mvc.role.Role;
import com.dcg.mvc.course.Course;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class UserMapper {

    private static final CourseMapper courseMapper = new CourseMapper();

    public static UserDTO convertToDTO(User user) {
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

        // Convert courses using CourseMapper
        List<CourseDTO> courses = user.getCourses().stream()
                .map(courseMapper::toDTO) // Use CourseMapper to convert Course to CourseDTO
                .collect(Collectors.toList());
        dto.setCourses(courses);

        return dto;
    }
}
