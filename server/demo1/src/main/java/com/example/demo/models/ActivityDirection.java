package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "activity_direction")
public class ActivityDirection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "dir_name")
    private String dir_name;

    public ActivityDirection(long id, String name) {
        this.id = id;
        this.dir_name = name;
    }

    public ActivityDirection() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return dir_name;
    }

    public void setName(String name) {
        this.dir_name = name;
    }
}
