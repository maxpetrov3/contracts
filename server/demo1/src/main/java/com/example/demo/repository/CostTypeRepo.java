package com.example.demo.repository;

import com.example.demo.models.CostType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CostTypeRepo extends JpaRepository<CostType, Long> {
}
