package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "fm_position")
public class FmPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    public FmPosition(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public FmPosition() {
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
