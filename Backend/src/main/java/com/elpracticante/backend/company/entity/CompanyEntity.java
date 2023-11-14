package com.elpracticante.backend.company.entity;


import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.intership.entity.IntershipEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "COMPANY")
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "COMPANY_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "EMPLOYEES_AMOUNT")
    private Integer employeesAmount;

    @Column(name = "AUTONOMOUS_COMMUNITY")
    private String autonomousCommunity;

    @Column(name = "CITY")
    private String city;

    @Column(name = "ABOUT_US")
    private String aboutUs;

    @Column(name = "WHY_US")
    private String whyUs;

    @OneToMany(mappedBy = "company")
    private List<IntershipEntity> interships;

}