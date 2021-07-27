package com.example.demo.repository;

import com.example.demo.models.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContractRepo extends JpaRepository<Contract, Long> {

    @Query(value = "SELECT * FROM contracts WHERE contract_id LIKE ?1"+"%", nativeQuery = true)
    List<Contract> serchContract(String text);



}
