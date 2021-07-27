package com.example.demo.repository;

import com.example.demo.models.ContractTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContractTaskRepo extends JpaRepository<ContractTask, Long> {

    @Query(value = "SELECT * FROM contract_task WHERE contract_id = ?1 ORDER BY end_date ASC", nativeQuery = true)
    List<ContractTask> getContractTasks(String contractId);
}
