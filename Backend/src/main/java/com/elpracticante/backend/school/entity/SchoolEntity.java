package com.elpracticante.backend.school.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "SCHOOL")
public class SchoolEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "SCHOOL_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "CITY")
    private String city;

    @Column(name = "AUTONOMOUS_COMMUNITY")
    private String autonomousCommunity;

    @Column(name = "ZIPCODE")
    private String zipCode;

    @Column(name = "FULL_ADRESS")
    private String fullAddress;


}
