package com.example.demo.repository;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM users where login = ?1", nativeQuery = true)
    User getByLogin(String login);
}
