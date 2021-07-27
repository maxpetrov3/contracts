package com.example.demo.repository;

import com.example.demo.models.ContractStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepo extends JpaRepository<ContractStatus, Long> {
}
