package com.example.demo.repository;

import com.example.demo.models.Kreditor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KreditorsRepo extends JpaRepository<Kreditor, Long> {
}
