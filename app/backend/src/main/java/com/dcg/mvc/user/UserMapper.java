package com.dcg.mvc.user;

import com.dcg.mvc.course.CourseMapper;
import com.dcg.mvc.role.RoleDTO;
import com.dcg.mvc.course.CourseDTO;
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
        dto.setSubscribeToEmail(user.isSubscribeToEmail());
        dto.setNameLastModifiedDate(user.getNameLastModifiedDate());
        dto.setDisabled(user.isDisabled());

        // Convert roles
        List<RoleDTO> roles = user.getRoles().stream()
                .map(role -> new RoleDTO(role.getId(), role.getName()))
                .collect(Collectors.toList());
        dto.setRoles(roles);
        dto.setImageUrl(user.getImageUrl());
        // Convert courses using CourseMapper
        List<CourseDTO> courses = user.getCourses().stream()
                .map(courseMapper::toDTO) // Use CourseMapper to convert Course to CourseDTO
                .collect(Collectors.toList());
        dto.setCourses(courses);

        return dto;
    }
}
