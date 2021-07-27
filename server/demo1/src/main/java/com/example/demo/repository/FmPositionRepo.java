package com.example.demo.repository;

import com.example.demo.models.FmPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FmPositionRepo extends JpaRepository<FmPosition, Long> {
}
