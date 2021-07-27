package com.example.demo.repository;

import com.example.demo.models.PayRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PayRulesRepo extends JpaRepository<PayRule, Long> {

    @Query(value = "SELECT * FROM pay_rule WHERE code LIKE ?1"+"%", nativeQuery = true)
    List<PayRule> searchPayRule(String text);
}
