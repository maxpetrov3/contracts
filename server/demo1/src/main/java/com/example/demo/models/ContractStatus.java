package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "contract_status")
public class ContractStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "status_name")
    private String status_name;

    public ContractStatus(long id, String status_name) {
        this.id = id;
        this.status_name = status_name;
    }

    public ContractStatus() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStatus_name() {
        return status_name;
    }

    public void setStatus_name(String status_name) {
        this.status_name = status_name;
    }
}
