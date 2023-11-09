package com.elpracticante.backend.degree.entity;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "DEGREE")
public class DegreeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)    @Column(name = "DEGREE_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

}
