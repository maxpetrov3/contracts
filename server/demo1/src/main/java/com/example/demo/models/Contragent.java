package com.example.demo.models;


import javax.persistence.*;

@Entity
@Table(name = "contragent")
public class Contragent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "contragent_id")
    private String contragent_id;

    @Column(name = "description")
    private String description;



    public Contragent() {

    }

    public Contragent(long id, String name, String contragent_id, String description) {
        this.id = id;
        this.name = name;
        this.contragent_id = contragent_id;
        this.description = description;
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

    public String getContragent_id() {
        return contragent_id;
    }

    public void setContragent_id(String contragent_id) {
        this.contragent_id = contragent_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Contragent{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", contragent_id='" + contragent_id + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
