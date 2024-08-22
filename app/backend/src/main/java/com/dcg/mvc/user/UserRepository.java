package com.dcg.mvc.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String username);
    @Query(value = "select count(*) from user",nativeQuery = true)
    public Long getUserCount();
    Set<User> findUsersByCoursesId(Long id);
}
