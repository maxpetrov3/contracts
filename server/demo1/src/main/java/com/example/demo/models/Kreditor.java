package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "kreditor")
public class Kreditor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    public Kreditor(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Kreditor() {
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
