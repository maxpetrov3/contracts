package com.example.demo.models;


import javax.persistence.*;
import javax.xml.crypto.dsig.spec.XSLTTransformParameterSpec;

@Entity
@Table(name = "cost_type")
public class CostType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    public CostType(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public CostType() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
