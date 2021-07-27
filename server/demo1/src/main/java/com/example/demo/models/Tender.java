package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "tender")
public class Tender {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    public Tender(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Tender() {
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
