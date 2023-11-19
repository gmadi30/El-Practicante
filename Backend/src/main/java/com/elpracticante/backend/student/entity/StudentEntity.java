package com.elpracticante.backend.student.entity;


import com.elpracticante.backend.degree.entity.DegreeEntity;
import com.elpracticante.backend.intership.entity.IntershipEntity;
import com.elpracticante.backend.school.entity.SchoolEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "STUDENT")
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "STUDENT_ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "BIRTHDAY")
    private LocalDate birthday;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "CITY")
    private String city;

    @Column(name = "AUTONOMOUS_COMMUNITY")
    private String autonomousCommunity;

    @Column(name = "ZIPCODE")
    private String zipCode;

    @Column(name = "MOBILE")
    private String mobile;

    @Column(name = "DNI")
    private String dni;

    @Column(name = "COMPANY_NAME")
    private String companyName;

    @ManyToOne(optional = false)
    @JoinColumn(name = "SCHOOL_ID")
    private SchoolEntity school;

    @ManyToOne(optional = false)
    @JoinColumn(name = "DEGREE_ID")
    private DegreeEntity degree;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<IntershipEntity> interships;



}

