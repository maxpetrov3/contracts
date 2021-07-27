package com.example.demo.repository;

import com.example.demo.models.PostPay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostPayRepo extends JpaRepository<PostPay, Long> {
}
