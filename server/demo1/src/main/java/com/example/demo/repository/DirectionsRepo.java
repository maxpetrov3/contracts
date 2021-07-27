package com.example.demo.repository;


import com.example.demo.models.ActivityDirection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectionsRepo  extends JpaRepository<ActivityDirection, Long> {
}
