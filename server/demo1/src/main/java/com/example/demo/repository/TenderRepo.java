package com.example.demo.repository;

import com.example.demo.models.Tender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenderRepo extends JpaRepository<Tender, Long> {
}
