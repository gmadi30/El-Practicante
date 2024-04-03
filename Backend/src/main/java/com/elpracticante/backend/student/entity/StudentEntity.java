package com.elpracticante.backend.student.entity;


import com.elpracticante.backend.internship.entity.InternshipEntity;
import com.elpracticante.backend.shared.entity.StudentProfilePictureEntity;
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

    @Column(name = "LASTNAME")
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

    @Column(name = "dni")
    private String dni;

    @Column(name = "COMPANY_NAME")
    private String companyName;

    @Column(name = "SCHOOL_NAME")
    private String schoolName;

    @Column(name = "DEGREE_NAME")
    private String degreeName;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InternshipEntity> internships;

    @OneToOne()
    @JoinColumn(name = "STUDENT_PROFILE_PICTURE_ID", referencedColumnName = "STUDENT_PROFILE_PICTURE_ID")
    private StudentProfilePictureEntity StudentProfilePicture;

}

