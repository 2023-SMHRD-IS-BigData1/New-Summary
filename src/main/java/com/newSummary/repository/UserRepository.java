package com.newSummary.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newSummary.domain.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUserEmail(String userEmail);
    Optional<User> findByUserEmail(String userEmail);
    boolean existsByUserPhone(String userPhone);
    
    void deleteById(String userEmail);
}
